
import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Sparkles } from 'lucide-react';
import ConversionPanel from './ConversionPanel';
import { ConvertFile } from '../utils/ConvertFile';

function Uploadarea() {
    const [files, setFiles] = useState([])
    const resetFile = useCallback((id) => {
        setFiles((curr) => curr.map((f) => f.id === id ? { ...f, status: 'ready', outputBlob: null } : f));
    }, []);

    const onDrop = useCallback((accepted) => {
        const mapped = accepted.map((file) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
            options: {
                quality: 80,
                targetFormat: "PNG",
                width: null,
                height: null,
                grayscale: false
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

    const handleConvertAll = async () => {
        setFiles(curr => {
            const converting = curr.map(f =>
                f.status === 'ready' ? { ...f, status: 'converting' } : f
            );

            Promise.all(
                converting.map(async (f) => {
                    if (f.status !== 'converting') return f;
                    try {
                        const blob = await ConvertFile(f);
                        return { ...f, outputBlob: blob, status: 'done' };
                    } catch {
                        return { ...f, status: 'error' };
                    }
                })
            ).then(setFiles);

            return converting;
        });
    };

    const clearAll = () => {
        files.forEach((f) => URL.revokeObjectURL(f.preview));
        setFiles([]);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-6 py-8">
            {/* UPLOAD AREA */}
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer max-w-4xl mx-auto transition-all duration-200
                ${isDragActive 
                    ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 shadow-lg shadow-cyan-500/20' 
                    : 'border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/70'
                }
            `}>
                <input {...getInputProps()} className='hidden' />
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                        <UploadCloud className={`w-16 h-16 transition-all duration-200 ${isDragActive ? 'text-cyan-400 scale-110' : 'text-slate-400 dark:text-slate-400'}`} />
                        {isDragActive && (
                            <div className="absolute inset-0 animate-ping">
                                <UploadCloud className="w-16 h-16 text-cyan-400/50" />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-slate-900 dark:text-white">
                            {isDragActive ? "Drop the files here..." : "Drag & drop files or click to browse"}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Supported: SVG, PNG, JPG, ICO, WebP, BMP, TIFF, GIF, PDF
                        </p>
                    </div>
                    <button className="px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 font-medium">
                        Browse Files
                    </button>
                </div>
            </div>

            {/* CONVERSION HEADER */}
            {files.length > 0 && (
                <div className="flex justify-between items-center mt-8 mb-6 max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ready to Convert</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={clearAll}
                            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            Clear All
                        </button>
                        <button
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                            disabled={files.every(f => f.status !== 'ready')}
                            onClick={handleConvertAll}
                        >
                            <Sparkles className="w-4 h-4" />
                            Convert {files.filter(f => f.status === 'ready').length} File(s)
                        </button>
                    </div>
                </div>
            )}

            {/* CONVERSION PANELS */}
            {files.length > 0 && (
                <div className="space-y-4 max-w-4xl mx-auto">
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
                            onRemove={() => setFiles(curr => curr.filter(f => f.id !== item.id))}
                            onConvert={() => resetFile(item.id)}
                            onDownload={() => {
                                const url = URL.createObjectURL(item.outputBlob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${item.file.name.split('.')[0]}.${item.options.targetFormat.toLowerCase()}`;
                                a.click();
                                URL.revokeObjectURL(url);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Uploadarea;
