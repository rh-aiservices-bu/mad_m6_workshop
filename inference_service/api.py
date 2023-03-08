from fastapi import FastAPI, File, UploadFile
from typing import List
from pydantic import BaseModel
import numpy as np
import cv2
from remote_infer import ort_v5
import os
from dotenv import load_dotenv
load_dotenv()

INFER_URL = os.getenv('INFER_URL', '')
CONF_THRESHOLD = float(os.getenv('CONF_THRESHOLD', 0.2))
IOU_THRESHOLD = float(os.getenv('IOU_THRESHOLD', 0.5))

class Prediction(BaseModel):
    predictions: List[List[float]]

app = FastAPI()

@app.post("/predictions/", response_model=Prediction)
async def create_upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    infer_url = INFER_URL
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    conf = CONF_THRESHOLD
    iou = IOU_THRESHOLD
    infer = ort_v5(img, infer_url, conf, iou, 640, 'classes.txt')
    result = infer().tolist()
    return {"predictions": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)