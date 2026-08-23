from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Team Pulse API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}