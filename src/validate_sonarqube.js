import { execSync } from 'child_process';
import assert from 'assert/strict';

// Configuration Definitions
const SONAR_SERVER = process.env.SONAR_HOST_URL || 'http://localhost:6788';
const SONAR_TOKEN = process.env.SONAR_TOKEN;
const PROJECT_KEY = process.env.SONAR_PROJECT_KEY || 'validation-testing-code';

// Target Expected Results (The Defect Matrix)
const EXPECTED_METRICS = {
    bugs: 1,
    vulnerabilities: 1,
    security_hotspots: 1
};

async function runValidation() {
    console.log('--- Step 1: Executing SonarQube Scanner Analysis ---');

    if (!SONAR_TOKEN) {
        console.error('Validation Failure: SONAR_TOKEN environment variable is not set.');
        process.exit(1);
    }

    try {
        execSync(
            `sonar-scanner ` +
            `-Dsonar.projectKey=${PROJECT_KEY} ` +
            `-Dsonar.sources=. ` +
            `-Dsonar.host.url=${SONAR_SERVER} ` +
            `-Dsonar.token=${SONAR_TOKEN}`,
            { stdio: 'inherit' }
        );

        console.log('Analysis submitted successfully.\n');
    } catch (error) {
        console.error('Validation Failure: Scanner execution failed.');
        process.exit(1);
    }

    // Allow asynchronous background processing on the server to finalize
    console.log(
        'Waiting 15 seconds for SonarQube server to process background task...'
    );

    await new Promise(resolve => setTimeout(resolve, 15000));

    console.log('\n--- Step 2: Fetching Quality Metrics from Web API ---');

    const apiUrl =
        `${SONAR_SERVER}/api/measures/component` +
        `?component=${PROJECT_KEY}` +
        `&metricKeys=bugs,vulnerabilities,security_hotspots`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${SONAR_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const data = await response.json();

        // Parse out metrics
        const measures = data.component.measures;
        const actual = {};

        measures.forEach(measure => {
            actual[measure.metric] = parseInt(measure.value, 10);
        });

        console.log('Actual Analysis Results:', actual);
        console.log('Expected Matrix Results:', EXPECTED_METRICS);

        console.log('\n--- Step 3: Asserting Tool Determinism (Audit Evaluation) ---');

        assert.equal(
            actual.bugs,
            EXPECTED_METRICS.bugs,
            'Bug detection count mismatch.'
        );

        assert.equal(
            actual.vulnerabilities,
            EXPECTED_METRICS.vulnerabilities,
            'Vulnerability detection count mismatch.'
        );

        assert.equal(
            actual.security_hotspots,
            EXPECTED_METRICS.security_hotspots,
            'Security hotspot detection count mismatch.'
        );

        console.log(
            '\n[SUCCESS] SonarQube Tool Validation Passed. Results are deterministic.'
        );
    } catch (err) {
        console.error('\n[FAILURE] Tool Validation Failed:', err.message);
        process.exit(1);
    }
}

runValidation();