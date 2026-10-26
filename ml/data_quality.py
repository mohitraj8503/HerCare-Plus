from __future__ import annotations

from pathlib import Path
from typing import Final

import pandas as pd

FEATURES: Final = [
    "Age",
    "SystolicBP",
    "DiastolicBP",
    "BS",
    "BodyTemp",
    "HeartRate",
]
TARGET: Final = "RiskLevel"
LABELS: Final = ["low risk", "mid risk", "high risk"]
RANGES: Final = {
    "Age": (1, 120),
    "SystolicBP": (60, 220),
    "DiastolicBP": (30, 140),
    "BS": (0, 40),
    "BodyTemp": (90, 110),
    "HeartRate": (1, 220),
}


def load_and_validate(path: Path) -> pd.DataFrame:
    data = pd.read_csv(path)
    expected = FEATURES + [TARGET]
    if list(data.columns) != expected:
        raise ValueError(f"Expected columns {expected}, found {list(data.columns)}")
    if data.empty:
        raise ValueError("Dataset is empty.")
    if data[FEATURES].isna().any().any() or data[TARGET].isna().any():
        raise ValueError("Dataset contains missing values.")
    if data[TARGET].isin(LABELS).all() is False:
        raise ValueError("Dataset contains an unknown target label.")
    for column, (lower, upper) in RANGES.items():
        if not data[column].between(lower, upper).all():
            raise ValueError(f"{column} contains values outside {lower}..{upper}.")
    if (data["SystolicBP"] <= data["DiastolicBP"]).any():
        raise ValueError("SystolicBP must exceed DiastolicBP.")
    if data.duplicated().sum() > 0:
        print(f"QUALITY WARNING: duplicate rows={data.duplicated().sum()}")
    if (data["Age"] < 13).any():
        print(f"QUALITY WARNING: age_below_13_rows={(data['Age'] < 13).sum()}")
    if (data["HeartRate"] < 30).any():
        print(f"QUALITY WARNING: heart_rate_below_30_rows={(data['HeartRate'] < 30).sum()}")
    return data
