# Task 5 Test Report

Date: 2026-10-26

## Commands

| Command | Result |
| --- | --- |
| `npm test` | Pass: 15 tests in 2 files |
| `python -m unittest discover -s ml\tests` | Pass: 3 tests |
| `npm run build` | Pass: production build and type validation |
| `npm run lint` | Blocked by existing ESLint 8 and `eslint/config` flat-config incompatibility |
| `git diff --check` | Pass |

New screening coverage includes strict numeric/boolean validation, unknown
field rejection, abstaining uncertainty, model version propagation, safety
limitation wording, urgent red-flag guidance, nested mass-assignment rejection,
and artifact-backed inference. Python tests cover dataset schema/labels, a
hand-computed ECE case, and PSI identity behavior. Coverage percentages were
not reported because the repository has no configured coverage threshold or
coverage command.

## Honest quality boundary

The endpoint is authenticated, stateless, and does not persist health inputs.
Clinical performance is not claimed. The model's retrospective metrics and
limitations are in [EVALUATION_REPORT.md](./EVALUATION_REPORT.md).
