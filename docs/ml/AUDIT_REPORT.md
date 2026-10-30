# Health Risk Screening Audit

## Scope decision

The repository contains a cycle-length prediction utility and a Gemini symptom
conversation endpoint. It contains no labeled clinical dataset, trained health
risk model, model artifact, calibration evidence, or clinician-reviewed
evaluation. Task 5 therefore delivers a transparent screening-indicator
contract and validation boundary only. It does not claim to be an ML model or
clinical decision support.

## Findings

| ID | Severity | Area | Finding | Status |
| --- | --- | --- | --- | --- |
| ML-001 | High | Evidence | No legitimate labeled dataset or model evaluation was present. | Blocked; documented |
| ML-002 | High | Safety | Existing cycle predictions have no measured uncertainty or clinical validation. | Mitigated in Task 5 scope; existing feature unchanged |
| ML-003 | High | API | Existing symptom chat is an informational conversation, not a validated risk prediction. | Documented; no risk labels added |
| ML-004 | Medium | Privacy | Existing anonymous/local-first design does not provide an authenticated persisted screening-record workflow. | Avoided: Task 5 endpoint stores no results |

## Approved scope

The new endpoint accepts a small, explicitly validated symptom-signal payload
and returns a ruleset risk band, factors, urgent-care guidance, model/ruleset
version, and an unconditional limitation. It abstains by design. It does not
diagnose, predict disease, persist health data, or infer missing facts.
