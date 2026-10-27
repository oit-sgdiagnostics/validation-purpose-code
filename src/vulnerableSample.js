import crypto from 'node:crypto';
import https from 'node:https';

// Seeded-defect file for SonarQube validation (SEEDED version).
// Each defect has an ID (DEF-nn) that is referenced in expected-metrics.json
// and in the validation protocol. Do not edit without raising a change request.

// DEF-01  Expected: Vulnerability (hard-coded secret / token)
const credential = "Mix7dK9JzL2pQw4RmVnXB1tYc8Es2aF4gHjK=";

// DEF-02  Expected: Bug (loop body allows only one iteration)
function processData(input) {
    while (true) {
        if (input === null) {
            // Will throw runtime TypeError immediately
            console.log(input.property);
            break;
        }

        break;
    }
}

// DEF-03  Expected: Vulnerability (TLS certificate verification disabled)
function fetchRecord(host) {
    return https.request({
        hostname: host,
        path: '/record',
        rejectUnauthorized: false
    });
}

// DEF-04  Expected: Bug (comparison with NaN is always false)
function isInvalidNumber(value) {
    return value === NaN;
}

// DEF-05  Expected: Vulnerability (weak hash algorithm MD5)
function hashValue(value) {
    return crypto.createHash('md5').update(value).digest('hex');
}

// DEF-06  Expected: Vulnerability (non-cryptographic random for a token)
function createSessionToken() {
    return Math.random().toString(36).slice(2);
}

// DEF-07  Expected: Code Smell (unused local variable)
function formatLabel(name) {
    const unusedCounter = 0;
    return name.trim().toUpperCase();
}

export {
    credential,
    processData,
    fetchRecord,
    isInvalidNumber,
    hashValue,
    createSessionToken,
    formatLabel
};