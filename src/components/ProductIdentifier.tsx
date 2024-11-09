import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';

export default function ProductIdentifier() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    name: string;
    confidence: number;
    details: {
      category: string;
      attributes: string[];
      suggestedPrice: string;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Load and preprocess the image
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => (img.onload = resolve));

      // Load the model and make prediction
      const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      const prediction = await model.predict(tensor);
      const results = await (prediction as tf.Tensor).data();
      
      // Mock result for demonstration
      setResult({
        name: "Premium Wireless Headphones",
        confidence: 0.92,
        details: {
          category: "Electronics & Accessories",
          attributes: [
            "Wireless",
            "Noise Cancelling",
            "Bluetooth 5.0",
            "40h Battery Life"
          ],
          suggestedPrice: "$79.99 - $129.99"
        }
      });
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">AI Product Identifier</h2>
        <p className="mt-2 text-gray-600">Upload a product image to get instant identification and details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
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
                  {isDragActive ? "Drop the image here" : "Drag & drop product image"}
                </p>
                <p className="text-sm text-gray-500 mt-1">or click to select</p>
              </div>
              <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP</p>
            </div>
          </div>

          {image && (
            <div className="mt-6">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt="Product preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-semibold">Analysis Results</h3>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="mt-4 text-gray-600">Analyzing image...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-500 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700">Product Name</h4>
                <p className="text-lg font-semibold text-indigo-600">{result.name}</p>
                <div className="mt-1 flex items-center">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-2 bg-indigo-600 rounded-full"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {Math.round(result.confidence * 100)}% confidence
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Category</h4>
                <p className="text-gray-900">{result.details.category}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Key Attributes</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.details.attributes.map((attr, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Suggested Price Range</h4>
                <p className="text-lg font-semibold text-green-600">
                  {result.details.suggestedPrice}
                </p>
              </div>
            </div>
          )}

          {!loading && !error && !result && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <ImageIcon className="h-8 w-8 mb-4" />
              <p>Upload an image to see the analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}