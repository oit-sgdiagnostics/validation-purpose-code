import crypto from 'node:crypto';
import https from 'node:https';

// Seeded-defect file for SonarQube validation (REMEDIATED version).
// Same functions as the seeded version, with every DEF-nn corrected.

// DEF-01  Fixed: secret read from the environment instead of source code
const apiSecretToken = process.env.API_SECRET_TOKEN;

// DEF-02  Fixed: loop removed
function processData(input) {
    if (input === null) {
        console.log('No input provided');
    }
}

// DEF-03  Fixed: default TLS certificate and hostname verification
function fetchRecord(host) {
    return https.request({
        hostname: host,
        path: '/record'
    });
}

// DEF-04  Fixed: correct NaN check
function isInvalidNumber(value) {
    return Number.isNaN(value);
}

// DEF-05  Fixed: SHA-256 instead of MD5
function hashValue(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
}

// DEF-06  Fixed: cryptographically secure random token
function createSessionToken() {
    return crypto.randomBytes(16).toString('hex');
}

// DEF-07  Fixed: unused variable removed
function formatLabel(name) {
    return name.trim().toUpperCase();
}

export {
    apiSecretToken,
    processData,
    fetchRecord,
    isInvalidNumber,
    hashValue,
    createSessionToken,
    formatLabel
};