from fastapi import FastAPI, File, UploadFile
import numpy as np
import cv2
from remote_infer import ort_v5

app = FastAPI()

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    infer_url = 'https://coolstore-guillaumes-sample-project.apps.rhods-internal.61tk.p1.openshiftapps.com/v2/models/coolstore/infer'
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    conf = 0.2
    iou = 0.2
    infer = ort_v5(img, infer_url, conf, iou, 640, '../classes.txt')
    result = infer()
    print(result)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)