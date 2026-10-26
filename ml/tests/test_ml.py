import sys
import unittest
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "ml"))

from data_quality import load_and_validate  # noqa: E402
from evaluate import _ece  # noqa: E402
from monitor import psi  # noqa: E402


class MlQualityTests(unittest.TestCase):
    def test_dataset_quality_and_schema(self):
        data = load_and_validate(ROOT / "ml/data/maternal-health-risk.csv")
        self.assertEqual(data.shape, (1014, 7))
        self.assertEqual(set(data["RiskLevel"]), {"low risk", "mid risk", "high risk"})

    def test_ece_hand_case(self):
        actual = np.array([0, 1, 1, 0])
        predicted = np.array([0.1, 0.9, 0.8, 0.2])
        self.assertAlmostEqual(_ece(actual, predicted), 0.15)

    def test_identical_distributions_have_zero_psi(self):
        values = np.arange(20, dtype=float)
        self.assertEqual(psi(values, values), 0.0)


if __name__ == "__main__":
    unittest.main()
