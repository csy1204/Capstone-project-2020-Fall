from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time

app = FastAPI(name="Music Recommendation API")

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


predicted_mock = [
    {"songname": "2002", "singer": "Anne Marie"},
    {"songname": "Dynamite", "singer": "BTS"},
    {"songname": "Snowman", "singer": "Sia"},
]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/tag/{tag_name}")
def read_item(tag_name):
    
    ## Model Prediction Part
    time.sleep(10)

    tag_len = len(tag_name)
    return { 
        "total_length": tag_len,
        "predictions": predicted_mock
    }


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
