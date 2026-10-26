# Model Card: Health Risk Screening

## Status

`maternal-risk-v1` is a small logistic-regression artifact trained on the UCI
Maternal Health Risk dataset. `ruleset-2026-10-26` remains the fallback for
non-pregnancy symptom signals. Neither is clinically validated.

## Intended use

Provide a conservative, educational screening risk indicator from six
user-reported signals and direct users toward appropriate care. The response
always abstains from claiming confidence and includes a plain-language
limitation.

## Out of scope

Diagnosis, triage replacement, treatment selection, emergency exclusion,
pregnancy assessment, population research, automated clinician decisions, and
any claim of clinical validation.

## Data and evaluation

Measured retrospective holdout results are documented in
[EVALUATION_REPORT.md](./EVALUATION_REPORT.md). The dataset card documents
provenance and duplicate/physiological-range problems. Probabilities are not
recalibrated; the service abstains in an uncertain zone and rejects OOD input.
These results are not clinical validation.

## Failure modes and retirement

Inputs can be incomplete, misunderstood, or outside the rules' scope. The
service uses strict ranges and an abstaining uncertainty state, but this does
not make the output clinically reliable. Any future version must retain this
version identifier and be retired if validation, safety, or privacy evidence
is inadequate.
