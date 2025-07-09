
import React from 'react'
import { Trash2,  SlidersHorizontal, ArrowRight, CheckCircle, Download } from "lucide-react";

function ConversionPanel({ item, onChange, onConvert, onDownload, onRemove }) {
    const { file, preview, options, status, outputBlob } = item
    const quality = options.quality
    const formats = ["SVG", "PNG", "JPG", "WebP", "GIF", "PDF"]

    const isConverted = status === 'done';
    const isConverting = status === 'converting'

    return (
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
            {/* FILE INFO HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                        <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-slate-900 dark:text-white truncate max-w-xs">{file.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
                
                {/* FORMAT CONVERSION */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-sm border border-slate-300 dark:border-slate-600">
                            {file.name.split(".").pop().toUpperCase()}
                        </span>
                        <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <span className="px-3 py-1 rounded-md bg-orange-500 text-white font-mono text-sm font-medium">
                            {options.targetFormat}
                        </span>
                    </div>
                    <select 
                        className="bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white px-3 py-2 rounded-md cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        value={options.targetFormat}
                        onChange={(e) => onChange({ targetFormat: e.target.value })}
                        disabled={isConverting || isConverted}
                    >
                        {formats.map((format) => (
                            <option key={format} value={format}>
                                {format}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2">
                    {isConverted && <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />}
                    <button 
                        onClick={onRemove}
                        disabled={isConverting}
                        className="p-2 text-slate-400 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                    >
                        <Trash2 className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>
            </div>

            {/* ADVANCED OPTIONS */}
            <details className="mb-4 group">
                <summary className="cursor-pointer text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-2 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors">
                    <SlidersHorizontal className="w-4 h-4" /> 
                    Advanced Options
                </summary>

                <div className="mt-4 p-4 bg-slate-200/30 dark:bg-slate-700/30 rounded-lg border border-slate-300/50 dark:border-slate-600/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* RESIZE OPTIONS */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Resize</label>
                            <div className="flex gap-2 items-center">
                                <input 
                                    placeholder="Width" 
                                    value={options.width ?? ""}
                                    onChange={(e) => onChange({ width: +e.target.value || null })}
                                    className="w-full p-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                                />
                                <span className="text-slate-400 dark:text-slate-400 text-sm">×</span>
                                <input 
                                    placeholder="Height" 
                                    value={options.height ?? ""}
                                    onChange={(e) => onChange({ height: +e.target.value || null })}
                                    className="w-full p-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* COMPRESSION */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Compression</label>
                            <div className="space-y-2">
                                <input 
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={quality}
                                    className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                                    onChange={(e) => onChange({ quality: +e.target.value })}
                                />
                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span>0%</span>
                                    <span className="text-slate-900 dark:text-white font-medium">{quality}%</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        {/* EFFECTS */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Effects</label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={options.grayscale}
                                    onChange={(e) => onChange({ grayscale: e.target.checked })}
                                    className="w-4 h-4 text-cyan-500 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-cyan-500 focus:ring-2"
                                />
                                <span className="text-slate-700 dark:text-slate-300">Grayscale</span>
                            </label>
                        </div>
                    </div>
                </div>
            </details>

            {/* CONVERSION SUCCESS */}
            {isConverted && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Conversion successful!
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => onConvert()}
                                className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white px-4 py-2 rounded-lg transition-colors border border-slate-300 cursor-pointer dark:border-slate-600"
                            >
                                Convert Again
                            </button>
                            <button
                                onClick={onDownload}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer font-medium"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ConversionPanel
