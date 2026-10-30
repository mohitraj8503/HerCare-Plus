from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.stats import ks_2samp

from data_quality import FEATURES


def psi(expected: np.ndarray, actual: np.ndarray, bins: int = 10) -> float:
    edges = np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))
    if len(edges) < 2:
        return 0.0
    expected_counts, _ = np.histogram(expected, bins=edges)
    actual_counts, _ = np.histogram(actual, bins=edges)
    expected_rate = np.maximum(expected_counts / len(expected), 1e-6)
    actual_rate = np.maximum(actual_counts / len(actual), 1e-6)
    return float(np.sum((actual_rate - expected_rate) * np.log(actual_rate / expected_rate)))


def main() -> None:
    parser = argparse.ArgumentParser(description="Compare a new sample to training distributions.")
    parser.add_argument("--training", default="ml/data/maternal-health-risk.csv")
    parser.add_argument("--sample", required=True)
    args = parser.parse_args()
    training = pd.read_csv(args.training)
    sample = pd.read_csv(args.sample)
    report = {}
    for feature in FEATURES:
        ks_stat, ks_pvalue = ks_2samp(training[feature], sample[feature])
        report[feature] = {
            "psi": psi(training[feature].to_numpy(), sample[feature].to_numpy()),
            "ks_statistic": float(ks_stat),
            "ks_pvalue": float(ks_pvalue),
            "alert": bool(psi(training[feature].to_numpy(), sample[feature].to_numpy()) >= 0.2 or ks_pvalue < 0.01),
        }
    print(json.dumps({
        "features": report,
        "alert_thresholds": {"psi": 0.2, "ks_pvalue": 0.01},
        "note": "Monitoring statistics indicate distribution change; they do not establish clinical harm.",
    }, indent=2))


if __name__ == "__main__":
    main()
