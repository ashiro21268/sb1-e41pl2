import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Table, Bot, Download, Loader2, CheckCircle2, Settings2, FileSpreadsheet } from 'lucide-react';

type ExtractedData = {
  id: string;
  type: string;
  value: string;
  confidence: number;
};

type SavedSheet = {
  id: string;
  name: string;
  date: string;
  entries: number;
};

export default function LeadExtractor() {
  const [files, setFiles] = useState<File[]>([]);
  const [extractionOptions, setExtractionOptions] = useState({
    names: true,
    phones: true,
    emails: true,
    addresses: true,
    companies: true,
    websites: true,
    socialMedia: true
  });
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);
  const [savedSheets, setSavedSheets] = useState<SavedSheet[]>([
    {
      id: '1',
      name: 'Business Cards Batch 1',
      date: '2024-02-20',
      entries: 45
    },
    {
      id: '2',
      name: 'Conference Leads',
      date: '2024-02-18',
      entries: 78
    }
  ]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'application/pdf': ['.pdf']
    }
  });

  const handleExtract = async () => {
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      const mockData: ExtractedData[] = [
        { id: '1', type: 'name', value: 'John Smith', confidence: 0.95 },
        { id: '2', type: 'email', value: 'john.smith@company.com', confidence: 0.98 },
        { id: '3', type: 'phone', value: '+1 (555) 123-4567', confidence: 0.92 },
        { id: '4', type: 'address', value: '123 Business Ave, Suite 100, New York, NY 10001', confidence: 0.89 },
        { id: '5', type: 'company', value: 'Tech Solutions Inc.', confidence: 0.94 },
        { id: '6', type: 'website', value: 'www.techsolutions.com', confidence: 0.97 },
        { id: '7', type: 'social', value: 'linkedin.com/in/johnsmith', confidence: 0.91 }
      ];
      setExtractedData(mockData);
      setLoading(false);
    }, 2000);
  };

  const handleSaveToSheet = () => {
    const newSheet: SavedSheet = {
      id: (savedSheets.length + 1).toString(),
      name: `Extracted Leads ${new Date().toLocaleDateString()}`,
      date: new Date().toISOString().split('T')[0],
      entries: extractedData.length
    };
    setSavedSheets(prev => [newSheet, ...prev]);
    setFiles([]);
    setExtractedData([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">AI Lead Extraction Bot</h2>
        <p className="mt-2 text-gray-600">Upload images or documents to automatically extract and organize lead information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload and Settings Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {isDragActive ? "Drop your files here" : "Drag & drop files"}
                </p>
                <p className="text-sm text-gray-500 mt-1">or click to select</p>
              </div>
              <p className="text-xs text-gray-400">Supports JPG, PNG, PDF</p>
            </div>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Uploaded Files ({files.length})</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{file.name}</span>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extraction Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold">Extraction Settings</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(extractionOptions).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setExtractionOptions(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Extract Button */}
          {files.length > 0 && (
            <button
              onClick={handleExtract}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <Bot className="h-5 w-5" />
                  Extract Information
                </>
              )}
            </button>
          )}
        </div>

        {/* Results and Saved Sheets Section */}
        <div className="space-y-6">
          {/* Extracted Data */}
          {extractedData.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Extracted Data</h3>
                <button
                  onClick={handleSaveToSheet}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  Save to Sheet
                </button>
              </div>
              <div className="space-y-3">
                {extractedData.map(data => (
                  <div key={data.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-medium text-gray-500 capitalize">{data.type}</span>
                        <p className="text-gray-900">{data.value}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {Math.round(data.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Sheets */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Saved Sheets</h3>
            <div className="space-y-3">
              {savedSheets.map(sheet => (
                <div key={sheet.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{sheet.name}</h4>
                      <p className="text-sm text-gray-500">
                        {sheet.date} • {sheet.entries} entries
                      </p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}