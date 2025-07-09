<!-- import React, { useState } from 'react';
import { Upload, Download, Settings, Moon, Sun, Image, FileImage, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function ImageConverterUI() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('PNG');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [batchFiles, setBatchFiles] = useState([
    { id: 1, name: 'sample1.jpg', size: '2.3 MB', status: 'ready' },
    { id: 2, name: 'sample2.png', size: '1.8 MB', status: 'ready' },
    { id: 3, name: 'sample3.gif', size: '890 KB', status: 'converting' }
  ]);

  const formats = ['SVG', 'PNG', 'JPEG/JPG', 'ICO', 'WebP', 'BMP', 'TIFF', 'GIF', 'PDF'];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const removeBatchFile = (id) => {
    setBatchFiles(batchFiles.filter(file => file.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileImage className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ImageConverter
              </h1>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Convert */}
          <div className="space-y-6">
            {/* Drag & Drop Upload Area */}
            <div className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 hover:border-blue-400 ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-800/50 hover:bg-gray-800/80' 
                : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}>
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Upload className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Drop your images here
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    or click to browse files
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['JPG', 'PNG', 'GIF', 'SVG', 'WebP'].map(format => (
                    <span
                      key={format}
                      className={`px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple />
            </div>

            {/* Format Selection */}
            <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Convert to
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {formats.map(format => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFormat === format
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className={`rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`w-full p-6 flex items-center justify-between transition-colors duration-200 ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Settings className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Advanced Options
                  </h3>
                </div>
                {showAdvanced ? (
                  <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>
              
              {showAdvanced && (
                <div className="px-6 pb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Width (px)
                      </label>
                      <input
                        type="number"
                        placeholder="Auto"
                        className={`w-full p-3 rounded-lg border transition-colors duration-200 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Height (px)
                      </label>
                      <input
                        type="number"
                        placeholder="Auto"
                        className={`w-full p-3 rounded-lg border transition-colors duration-200 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Quality: 80%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      defaultValue="80"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Convert Images
              </button>
              <button className={`px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Preview & Batch */}
          <div className="space-y-6">
            {/* Preview Area */}
            <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Preview
              </h3>
              <div className={`aspect-square rounded-lg border-2 border-dashed flex items-center justify-center ${
                isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-center">
                  <Image className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Upload an image to see preview
                  </p>
                </div>
              </div>
            </div>

            {/* Batch Conversion */}
            <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Batch Queue ({batchFiles.length})
                </h3>
                <button className={`text-sm font-medium transition-colors duration-200 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  Clear All
                </button>
              </div>
              
              <div className="space-y-3">
                {batchFiles.map(file => (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                      isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <FileImage className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {file.name}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {file.size}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        file.status === 'ready'
                          ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                          : file.status === 'converting'
                          ? isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                          : isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {file.status}
                      </span>
                      <button
                        onClick={() => removeBatchFile(file.id)}
                        className={`p-1 rounded transition-colors duration-200 ${
                          isDarkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-16 border-t transition-colors duration-300 ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                <FileImage className="w-4 h-4 text-white" />
              </div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 ImageConverter. All rights reserved.
              </span>
            </div>
            
            <div className="flex space-x-6">
              {['About', 'Privacy', 'Terms', 'GitHub'].map(link => (
                <button
                  key={link}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} -->