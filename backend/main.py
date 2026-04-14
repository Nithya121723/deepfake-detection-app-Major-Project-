from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os

from deepfake_detection import generate_gradcam_and_ensemble_predict
from hybrid_vid_improved import ImprovedHybridAnalyzer

app = FastAPI()

# ✅ CORS (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📁 Folders
UPLOAD_DIR = "uploads"
MEDIA_DIR = "media"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(MEDIA_DIR, exist_ok=True)

# 📡 Serve images
app.mount("/media", StaticFiles(directory="media"), name="media")

# 🎥 Video analyzer
video_analyzer = ImprovedHybridAnalyzer()

# ---------------- IMAGE ----------------
@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = generate_gradcam_and_ensemble_predict(
        request=None,
        img_path=file_path
    )

    return result


# ---------------- VIDEO ----------------
@app.post("/predict/video")
async def predict_video(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = video_analyzer.analyze_video(file_path)

    return result