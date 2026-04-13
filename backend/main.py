from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "CropGuard AI Backend Running 🚀"}

@app.post("/chat")
async def chat(message: dict):
    user_input = message.get("message", "")
    return {"reply": f"AgriBot: {user_input}"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    return {
        "disease": "Leaf Disease",
        "confidence": "92%",
        "solution": "Use fungicide"
    }