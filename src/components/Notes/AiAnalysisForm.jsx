import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Upload, Sparkles } from 'lucide-react';

const AiAnalysisForm = ({ onFileUpload, onTextSubmit, isProcessing }) => {
  const [uploadText, setUploadText] = useState('');

  const handleTextChange = (e) => {
    setUploadText(e.target.value);
  };

  const handleTextFormSubmit = (e) => {
    e.preventDefault();
    if (!uploadText.trim()) return;
    onTextSubmit(uploadText);
    setUploadText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="floating-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Analysis
          </CardTitle>
          <CardDescription className="text-gray-400">
            Upload PDFs or paste lecture text for instant summarization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Upload PDF</Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={onFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={isProcessing}
                />
                <label
                  htmlFor="file-upload"
                  className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-blue-400 transition-colors ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">
                    {isProcessing ? 'Processing...' : 'Choose PDF file'}
                  </span>
                </label>
              </div>
            </div>

            <form onSubmit={handleTextFormSubmit} className="space-y-2">
              <Label className="text-white">Paste Text</Label>
              <div className="space-y-2">
                <Textarea
                  value={uploadText}
                  onChange={handleTextChange}
                  placeholder="Paste your lecture notes or text here..."
                  className="w-full h-24 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled={isProcessing}
                />
                <Button
                  type="submit"
                  disabled={!uploadText.trim() || isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Text
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AiAnalysisForm;