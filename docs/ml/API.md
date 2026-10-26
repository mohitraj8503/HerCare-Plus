# Health Risk Screening API

`POST /api/health-risk` accepts JSON only and requires an authenticated
NextAuth session. The current endpoint is stateless: it does not store the
submitted health data.

```json
{
  "age": 28,
  "symptomDurationDays": 2,
  "painSeverity": 2,
  "heavyBleeding": false,
  "faintingOrSevereDizziness": false,
  "pregnancyPossible": false
}
```

For pregnancy-specific model inference, set `pregnancyPossible` to `true` and
include all six `maternalVitals`: `age`, `systolicBP`, `diastolicBP`,
`bloodSugar`, `bodyTemperature`, and `heartRate`. The model artifact is
`maternal-risk-v1`; its raw probability is not clinically calibrated.

Numeric ranges are age `13..120`, duration `0..365`, and pain `0..10`.
Unauthenticated requests return `401`; unknown fields and malformed values
return `400`; oversized requests return `413`.

Every successful response includes `modelVersion`, `riskBand`, `factors`,
`confidence`, `abstained`, next steps, and the limitation: “screening risk
indicator, not a diagnosis.” The ruleset and model are not clinically
validated. A `higher indicator` or worsening symptom requires urgent clinical
attention; call local emergency services for an emergency.

The model path also returns a probability field, may abstain below 0.55, and
returns `outOfDistribution: true` with no prediction when range or Mahalanobis
distance checks fail. Server logs contain only model version, latency, OOD
flag, confidence, and aggregate counters.
