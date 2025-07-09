import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import ConversionPanel from './ConversionPanel';


function Uploadarea() {
    const [files, setFiles] = useState([])

    const onDrop = useCallback((accepted) => {
        const mapped = accepted.map((file) => ({
            id: crypto.randomUUID(),
            file,                              // keep original File intact
            preview: URL.createObjectURL(file),
            options: { 
                quality: 80,
                targetFormat: "PNG"
            },
            status: 'ready'
        }));
        setFiles((curr) => [...curr, ...mapped])
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: true
    });

    useEffect(() => {
        return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
    }, [files]);

    return (
        <div className=' px-7 py-7'>
            {/* UPLOAD AREA */}
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer max-w-5xl mx-auto
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800'}
        `}>
                <input {...getInputProps()} className='hidden' />
                <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                    <UploadCloud className={`w-12 h-12 md:w-16 md:h-16 transition-colors, ${isDragActive ? 'text-primary' : ''}`} />
                    <p className="text-lg md:text-xl font-semibold text-foreground">
                        {isDragActive ? "Drop the files here..." : "Drag & drop files or click to browse"}
                    </p>
                    <p className="text-xs md:text-sm">
                        Supported: SVG, PNG, JPG, ICO, WebP, BMP, TIFF, GIF, PDF
                    </p>
                    <button
                        className="px-4 py-2 rounded-md border border-gray-500 text-gray-300 bg-transparent  transition-colors"
                    >
                        Browse Files
                    </button>

                </div>
            </div>
            {files.length > 0 && (
                <div className="space-y-6">
                    {files.map((item) => (
                        <ConversionPanel
                            key={item.id}
                            item={item}
                            onChange={(patch) =>
                                setFiles(curr =>
                                    curr.map((f) =>
                                        f.id === item.id ? { ...f, options: { ...f.options, ...patch } } : f
                                    )
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Uploadarea;


