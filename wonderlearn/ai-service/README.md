# WonderLearn AI Service (scaffold)

Future Python/FastAPI service. Not implemented yet — mirrors the contract
already used by the frontend's `aiService.ts`.

```
ai-service/
└── app/
    ├── routers/     # /recommendation, /next-activity, /mastery, /analyze
    ├── models/      # pydantic schemas + BKT (Bayesian Knowledge Tracing) state
    └── services/    # scikit-learn / PyTorch inference, pandas/numpy feature prep
```

Planned stack: FastAPI, scikit-learn, PyTorch, Pandas, NumPy, Bayesian
Knowledge Tracing for skill-mastery estimation, plus an LLM API for
generating personalized explanations/hints.
