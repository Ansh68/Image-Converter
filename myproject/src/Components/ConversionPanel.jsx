import React from 'react'
import { Trash2, Info, SlidersHorizontal,ArrowRight } from "lucide-react";

function ConversionPanel({item , onChange}) {
    const { file, preview , options } = item
    const quality  = options.quality
    
    const formats = [ "SVG", "PNG", "JPG", "ICO", "WebP", "BMP", "TIFF", "GIF", "PDF" ]


    return (
        <div className="mt-10 max-w-5xl mx-auto bg-gray-900 dark:bg-gray-900 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img src={preview} alt={file.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                        <h4 className="text-lg font-medium">{file.name}</h4>
                        <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
                <div className="flex items-center gap-2" >
                    <span  className="px-3 py-1 rounded bg-gray-800 text-orange-400  font-mono text-xl">
                        {file.name.split(".").pop().toUpperCase()}
                    </span>
                    <ArrowRight className='m-2 text-gray-500'/>
                    <select  className="bg-gray-800 text-white cursor-pointer px-4 py-2 rounded"
                    value={options.targetFormat} 
                    onChange={(e) => onChange({ targetFormat: e.target.value })}
                    >
                        {formats.map((values)=>(
                            <option  key={values} value={values}>
                                {values}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-gray-300  hover:text-white">
                        <Info />
                    </button>
                    <button className="text-red-400 hover:text-red-600">
                        <Trash2 />
                    </button>
                </div>
            </div>

            <details className="mb-4">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Advanced Options
                </summary>

                <div className="mt-4 flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm">Resize</label>
                        <div className="flex gap-2">
                            <input placeholder="Width" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                            <span className="text-gray-400">x</span>
                            <input placeholder="Height" className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700" />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="text-sm">Compression</label>
                        <div className="flex items-center gap-2 mt-1">
                            <input type="range" 
                            min={0} 
                            max={100} 
                            value={quality} 
                            className="w-full" 
                            onChange={(e) => onChange({quality : +e.target.value})}
                            />
                            <span>{quality}%</span>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="text-sm">Effects</label>
                        <div className="flex gap-2 mt-1">
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" /> Grayscale
                            </label>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    )
}

export default ConversionPanel
