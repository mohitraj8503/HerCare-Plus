# Health Risk Screening Limitations

- The pregnancy-vitals path uses a logistic-regression artifact trained on the
  UCI Maternal Health Risk dataset; the general symptom path remains a
  deterministic ruleset. Neither is clinically validated.
- Holdout metrics are retrospective and affected by 562 duplicate rows.
- Probabilities are not recalibrated and must not be treated as calibrated
  clinical confidence.
- The rules are not a substitute for history, examination, testing, or
  clinician judgment and may miss serious illness or produce unnecessary
  concern.
- The result is a screening risk indicator, not a diagnosis. A qualified
  clinician should review persistent, severe, or worrying symptoms.
- The endpoint does not store screening results. A PSI/KS drift script exists,
  but it has not been connected to production telemetry.
- Clinical claims would require a governed dataset, prespecified protocol,
  ethics/privacy review, external validation, calibration, subgroup analysis,
  and prospective clinician-reviewed evidence.
