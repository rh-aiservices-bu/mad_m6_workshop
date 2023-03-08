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

class Box(BaseModel):
    xMax: float
    xMin: float
    yMax: float
    yMin: float

class Detection(BaseModel):
    box: Box
    cValue: float
    class_: str
    label: str
    score: float

    class Config:
        allow_population_by_field_name = True
        fields = {
            'class_': 'class'
        }

class Detections(BaseModel):
    detections: List[Detection]

app = FastAPI()

@app.post("/predictions/", response_model=Detections)
async def create_upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    infer_url = INFER_URL
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    conf = CONF_THRESHOLD
    iou = IOU_THRESHOLD
    infer = ort_v5(img, infer_url, conf, iou, 640, 'classes.txt')
    raw_detections = infer().tolist()
    result = Detections(detections=[])
    for raw_detection in raw_detections:
        box = Box(xMax=raw_detection[0], xMin=raw_detection[2], yMax=raw_detection[1], yMin=raw_detection[3])
        detection = Detection(box=box, 
            cValue=15, class_=raw_detection[5], label=raw_detection[5], score=raw_detection[4])
        result.detections.append(detection)

    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)