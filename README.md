# SonarQube Validation Sample

This repository contains a controlled Node.js codebase intended for software
validation of SonarQube static code analysis.

## Contents

- `src/vulnerableSample.js` - Controlled source code containing intentional defects.
- `src/validate_sonarqube.js` - Automated validation instrument.
- `docs/sonarqube_validation_report.md` - Validation protocol and report.
- `Dockerfile` - Container definition for the Node.js validation environment.

## Runtime

- Node.js 24
- Docker

## Validation

The validation instrument executes SonarQube analysis and compares the
resulting metrics against the predefined expected defect matrix.