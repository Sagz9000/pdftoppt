import React, { useCallback, useState } from 'react';
import { Upload, FileType, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    isUploading: boolean;
}

export function FileUpload({ onFileSelect, isUploading }: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === "application/pdf") {
                setSelectedFile(file);
                onFileSelect(file);
            } else {
                alert("Please upload a PDF file.");
            }
        }
    }, [onFileSelect]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            onFileSelect(e.target.files[0]);
        }
    }, [onFileSelect]);

    return (
        <div className="w-full max-w-xl mx-auto">
            <motion.div
                className={twMerge(
                    "relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ease-in-out cursor-pointer overflow-hidden",
                    dragActive ? "border-indigo-500 bg-indigo-50/50 scale-102" : "border-gray-300 hover:border-indigo-400 bg-white/50 backdrop-blur-sm",
                    isUploading && "pointer-events-none opacity-80"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleChange}
                />

                <AnimatePresence mode='wait'>
                    {isUploading ? (
                        <motion.div
                            key="uploading"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center justify-center space-y-4"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin relative z-10" />
                            </div>
                            <p className="text-xl font-medium text-gray-700">Converting your deck...</p>
                            <p className="text-sm text-gray-500">Hold tight, we're preserving those layouts.</p>
                        </motion.div>
                    ) : selectedFile ? (
                        <motion.div
                            key="selected"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center space-y-4"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-50 shadow-sm">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-900">{selectedFile.name}</p>
                                <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <p className="text-sm text-indigo-600 font-medium">Click to change file</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-2 border-4 border-indigo-50/50 shadow-inner">
                                <Upload className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Data Liberation
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Drag & drop your PDF here, or click to browse.
                                <br />
                                <span className="text-xs text-indigo-400 mt-2 block">Optimized for NotebookLM Exports</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Background Decorative Blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
        </div>
    );
}
