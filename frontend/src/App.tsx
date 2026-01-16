import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Assuming backend is at localhost:8000
      const response = await fetch('http://localhost:8000/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Conversion failed');

      const data = await response.json();
      // Construct full URL if relative
      // For development, assuming proxy or direct access
      const url = `http://localhost:8000${data.download_url}`;
      setDownloadUrl(url);
    } catch (error) {
      console.error(error);
      alert("An error occurred during conversion.");
      setIsUploading(false); // Reset on error
      return;
    }

    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] relative overflow-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

      {/* Abstract Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] opacity-60" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-pink-100/30 rounded-full blur-[80px] opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
            AI Agentic Converter
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x p-2">
            PDF to PowerPoint
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Transform your static PDFs into fully editable PPTX slides.
            Perfect for <span className="text-indigo-600 font-semibold">NotebookLM exports</span>.
          </p>
        </motion.div>

        <div className="w-full mb-12">
          <FileUpload onFileSelect={handleFileSelect} isUploading={isUploading} />
        </div>

        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: downloadUrl ? 1 : 0 }}
          className="text-center"
        >
          {downloadUrl && (
            <a
              href={downloadUrl}
              className="inline-flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Download className="w-6 h-6" />
              <span>Download Presentation</span>
            </a>
          )}
        </motion.div>

        {/* Footer info */}
        <div className="absolute bottom-8 text-center w-full text-slate-400 text-sm">
          <p>Preserves layout • Editable Text • Vector Graphics</p>
        </div>

      </div>
    </div>
  );
}

export default App;
