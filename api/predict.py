from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity in this setup; restrict in production if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and pipeline
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "student-performance", "model.pkl")
PIPELINE_PATH = os.path.join(BASE_DIR, "student-performance", "pipeline.pkl")

try:
    model = joblib.load(MODEL_PATH)
    pipeline = joblib.load(PIPELINE_PATH)
    print("Model and pipeline loaded successfully.")
except Exception as e:
    print(f"Error loading model/pipeline: {e}")
    model = None
    pipeline = None

class PredictionRequest(BaseModel):
    hours_studied: float
    previous_scores: float
    extracurricular_activities: str
    sleep_hours: float
    sample_question_papers_practiced: float

    class Config:
        schema_extra = {
            "example": {
                "hours_studied": 7,
                "previous_scores": 85,
                "extracurricular_activities": "Yes",
                "sleep_hours": 7,
                "sample_question_papers_practiced": 5
            }
        }

@app.post("/api/predict")
async def predict(request: PredictionRequest):
    if not model or not pipeline:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        # Prepare data for pipeline
        # The keys must match exactly what the pipeline expects (from original CSV columns)
        input_data = pd.DataFrame([{
            "Hours Studied": request.hours_studied,
            "Previous Scores": request.previous_scores,
            "Extracurricular Activities": request.extracurricular_activities,
            "Sleep Hours": request.sleep_hours,
            "Sample Question Papers Practiced": request.sample_question_papers_practiced
        }])

        transformed_data = pipeline.transform(input_data)
        prediction = model.predict(transformed_data)

        # Return the first prediction
        return {"prediction": round(float(prediction[0]), 2)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Student Performance Prediction API is running"}
