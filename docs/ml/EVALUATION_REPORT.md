# Maternal risk evaluation report

## Reproduction

```powershell
python ml\train.py --config ml\config.json
python ml\evaluate.py --config ml\config.json
```

The fixed seed is `20261026`; the downloaded CSV contains 1,014 rows and the
stratified test set contains 203 rows. The UCI metadata page reports 1,013
instances, so this one-row provenance discrepancy is disclosed. The test set
was not used for model selection. Logistic regression was selected after
standardized preprocessing and five-fold cross-validation. The training data
contains 562 duplicate rows, so random splitting can overstate generalization.

## Holdout results

| Metric | Measured value |
| --- | ---: |
| Accuracy | 0.5714 |
| CV balanced accuracy (mean +/- SD) | 0.6170 +/- 0.0351 |
| One-vs-rest ROC-AUC | 0.7819 |
| Macro PR-AUC | 0.6505 |
| Macro Brier score | 0.1668 |
| Macro ECE (10 bins) | 0.0961 |

| Class | N positive | Sensitivity (95% bootstrap CI) | Specificity | PPV | NPV |
| --- | ---: | --- | ---: | ---: | ---: |
| low risk | 81 | 0.7654 (0.6710–0.8537) | 0.6803 | 0.6139 | 0.8137 |
| mid risk | 67 | 0.3284 (0.2203–0.4444) | 0.7353 | 0.3793 | 0.6897 |
| high risk | 55 | 0.5818 (0.4499–0.7209) | 0.9189 | 0.7273 | 0.8553 |

Confusion matrix in label order `[low risk, mid risk, high risk]`:

```text
[[62, 16, 3],
 [36, 22, 9],
 [3, 20, 32]]
```

Calibration was not recalibrated: the macro ECE is 0.0961, with per-class
Brier scores of 0.1791 (low), 0.2120 (mid), and 0.1093 (high). The production
adapter therefore labels its probability as an uncertain screening estimate
and abstains below 0.55; it does not call these probabilities calibrated.

## Subgroups

| Age band | N | Balanced accuracy | Caveat |
| --- | ---: | ---: | --- |
| 10–19 | 66 | 0.5361 | Retrospective subgroup estimate |
| 20–34 | 94 | 0.7049 | Retrospective subgroup estimate |
| 35+ | 43 | 0.6852 | Retrospective subgroup estimate |

The age bands are not representative demographic validation. The dataset is
from rural Bangladesh and is pregnancy-specific; age 10–19 includes 39
dataset rows below the application's general screening minimum of 13.

## What these numbers do not show

They do not establish clinical validity, safety, causal relationships,
generalization to HerCare+ users, or usefulness for diagnosis or treatment.
The source has duplicate records, limited geographic context, unclear clinical
labeling workflow in this repository, and no prospective clinician review.
