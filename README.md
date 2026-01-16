# PDF to PPT Converter

A premium, AI-agentic web application designed to convert PDF files into fully editable PowerPoint (.pptx) presentations. This tool is specifically optimized for preserving layouts from exports like **NotebookLM**, making data liberation seamless.

## 🚀 Features

- **High-Fidelity Layout Preservation**: Reconstructs text boxes and images at their original PDF coordinates.
- **Editable Text**: Unlike simple PDF-to-Image converters, this tool extracts text as native, modifiable PowerPoint text boxes.
- **Vector Backgrounds**: Recreates background shapes and headers for professional-looking slides.
- **Premium UI**: Modern, responsive interface built with React, Tailwind CSS, and Framer Motion.
- **Auto-Cleanup**: Automatically deletes temporary files after conversion and download to ensure privacy and efficiency.
- **Dockerized**: Easy setup with Docker Desktop, bypassing local dependency requirements.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: FastAPI, PyMuPDF (fitz), python-pptx.
- **Infrastructure**: Docker, Docker Compose.

## 📦 Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Installation & Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sagz9000/pdftoppt.git
   cd pdftoppt
   ```

2. **Start the application**:
   ```bash
   docker compose up --build -d
   ```

3. **Access the app**:
   - **Web Interface**: [http://localhost:5173](http://localhost:5173)
   - **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📖 Usage

1. Drag and drop your PDF file onto the upload zone.
2. Wait for the conversion process to complete.
3. Once finished, click the **Download Presentation** button.
4. Open the `.pptx` file in PowerPoint and start editing!

## 🧹 Maintenance

The application includes a built-in cleanup mechanism:
- Uploaded PDFs are deleted immediately after processing.
- Generated PPTX files are deleted automatically after being downloaded.

---
Built with ⚡ by Antigravity
