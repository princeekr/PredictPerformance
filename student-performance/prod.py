import os
import pandas as pd
import numpy as np
import joblib

from sklearn.compose import make_column_selector
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LinearRegression

MODEL_FILE = "model.pkl"
PIPELINE_FILE = "pipeline.pkl"

def build_pipeline(num_cols, cat_cols):
    num_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy = "median")),
    ("scaler", StandardScaler()),
    ])

    cat_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore")),
    ])

    full_pipeline = ColumnTransformer([
        ("num", num_pipeline, num_cols),
        ("cat", cat_pipeline, cat_cols)
    ])
    return full_pipeline

if not os.path.exists(MODEL_FILE):
    # TRAINING PHASE
    data = pd.read_csv("StudentPerformance.csv")

    # Stratified shuffle split  -- cannot be used in it! So we use normal split 
    train, test = train_test_split(data, test_size=0.2, random_state=42)
    train_copy = train.copy()

    #seperating label
    train_copy_labels = train_copy['Performance Index'].copy()
    train_copy_features = train_copy.drop('Performance Index', axis = 1)

    num_cols = make_column_selector(dtype_include="number") 
    cat_cols = make_column_selector(dtype_exclude="number")

    pipeline = build_pipeline(num_cols, cat_cols)
    data_prepared = pipeline.fit_transform(train_copy_features)

    model = LinearRegression()
    model.fit(data_prepared, train_copy_labels)

    # Save model and pipeline
    joblib.dump(model, MODEL_FILE)
    joblib.dump(pipeline, PIPELINE_FILE)

    print("Model trained and saved.")

else:
    model = joblib.load(MODEL_FILE)
    pipeline = joblib.load(PIPELINE_FILE)

    print("Enter student data:")

    hours = float(input("Hours Studied: "))
    prev = float(input("Previous Scores: "))
    extra = input("Extracurricular Activities (Yes/No): ").capitalize()
    sleep = float(input("Sleep Hours: "))
    papers = float(input("Sample Papers Practiced: "))

    df = pd.DataFrame([{
        "Hours Studied": hours,
        "Previous Scores": prev,
        "Extracurricular Activities": extra,
        "Sleep Hours": sleep,
        "Sample Question Papers Practiced": papers
    }])

    transformed = pipeline.transform(df)
    pred = model.predict(transformed)

    print("\nPredicted Performance Index:", pred[0])