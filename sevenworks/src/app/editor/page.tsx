"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Page() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            if (file.type === 'application/pdf') {
                // Store the PDF file in the state
                setPdfFile(file);
                // Create a URL for the PDF file
                const url = URL.createObjectURL(file);
                setPdfUrl(url);
                console.log('PDF file uploaded:', file);
            } else {
                console.error('Only PDF files are allowed');
            }
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf' });

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold text-black">Editor</h1>
            <p className="text-3xl text-black-700 font-bold">
                PDF Upload
            </p>
            <div className="flex flex-col gap-4">
                <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-4 text-center">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag file or click to select file (.PDF only)</p>
                    )}
                </div>
                {pdfFile && (
                    <div className="mt-4 flex items-center gap-2">
                        <p>Uploaded PDF: {pdfFile.name}</p>
                        {pdfUrl && (
                            <a href={pdfUrl} download={pdfFile.name} className="text-blue-500 underline">
                                Download PDF
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}