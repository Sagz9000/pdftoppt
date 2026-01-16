from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os
from converter import convert_pdf_to_pptx

app = FastAPI()

from fastapi.responses import FileResponse
from fastapi import BackgroundTasks

def remove_file(path: str):
    try:
        os.remove(path)
    except Exception as e:
        print(f"Error removing file: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("temp", exist_ok=True)

@app.get("/download-result/{filename}")
async def download_result(filename: str, background_tasks: BackgroundTasks):
    file_path = f"temp/{filename}"
    if os.path.exists(file_path):
        return FileResponse(file_path, background=background_tasks.add_task(remove_file, file_path))
    return {"error": "File not found"}

@app.post("/convert")
async def convert(file: UploadFile = File(...)):
    os.makedirs("temp", exist_ok=True)
    file_path = f"temp/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    output_path = file_path.replace(".pdf", ".pptx")
    try:
        convert_pdf_to_pptx(file_path, output_path)
    finally:
        # Cleanup input PDF immediately
        remove_file(file_path)
    
    return {"message": "Conversion successful", "download_url": f"/download-result/{os.path.basename(output_path)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
