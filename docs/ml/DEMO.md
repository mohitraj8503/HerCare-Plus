# Task 5 local demo

Install JavaScript dependencies:

```powershell
npm install
```

Run the application:

```powershell
npm run dev
```

Open `http://localhost:3000/health-risk`, sign in, and submit the form. The
page uses the real authenticated API and shows loading, error, uncertainty,
urgent-care, and limitation states. The current form uses the transparent
symptom ruleset; pregnancy-vitals model requests can be exercised directly
with the JSON contract in [API.md](./API.md).

Run the model lifecycle:

```powershell
python ml\train.py --config ml\config.json
python ml\evaluate.py --config ml\config.json
python -m unittest discover -s ml\tests
```

No screenshots are committed because no browser automation tool is configured
in this repository and screenshots must not contain real health data.
