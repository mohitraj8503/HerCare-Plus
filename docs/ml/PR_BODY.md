# Task 5: Health Risk Screening & ML Intelligence

## Summary

- Added an authenticated, stateless `/api/health-risk` contract with strict
  input validation, request-size protection, versioned responses, explicit
  abstention, and urgent-care guidance.
- Added a transparent fallback ruleset plus a versioned logistic-regression
  artifact trained from the UCI Maternal Health Risk dataset.
- Added reproducible quality checks, stratified holdout evaluation,
  cross-validation, bootstrap sensitivity intervals, calibration diagnostics,
  subgroup analysis, OOD detection, PSI/KS monitoring, and non-identifying
  telemetry.
- Added an authenticated result screen, model/API/docs, and Python/TypeScript
  tests.

## Scope and evidence

The dataset is UCI Maternal Health Risk (CC BY 4.0). The downloaded CSV has
1,014 rows while the UCI metadata reports 1,013 instances; this discrepancy is
disclosed in the dataset card. SHA-256:
`a1f7025719f84715096e0d1f95ae2e56b57809b9b15449e1836c96a7d976ae9b`.
The holdout contains 203 rows. ROC-AUC was 0.7819, macro PR-AUC 0.6505,
macro Brier 0.1668, and macro ECE 0.0961. Mid-risk sensitivity was only
0.3284 (95% CI 0.2203–0.4444). These are retrospective research estimates,
not clinical validation; the dataset contains 562 duplicate rows.

## Safety and privacy

Responses say “screening risk indicator, not a diagnosis,” identify uncertain
confidence, and recommend qualified clinical care. Authentication is required;
the endpoint is stateless and does not log or store submitted health values.
Unknown fields and out-of-range values are rejected.

## Verification

- `npm test`: 15 tests passed.
- `python -m unittest discover -s ml\tests`: 3 tests passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- `npm run lint`: pre-existing repository configuration blocker (ESLint 8
  cannot resolve `eslint/config`).

## Partial/blockers

Clinical validation, probability recalibration, production drift scheduling,
persisted screening records, clinician/admin views, and browser screenshots
remain partial or blocked pending clinical governance, a persisted screening
data model, and a configured browser automation workflow.
