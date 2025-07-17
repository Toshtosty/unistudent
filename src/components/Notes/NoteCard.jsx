import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Copy, Share2, Download } from 'lucide-react';

const NoteCard = ({ note, onCopy, onShare, onDownload, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <Card className="floating-card card-hover h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {note.title}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {note.subject} • {new Date(note.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onCopy(note.summary)}
                className="text-gray-400 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onShare(note)}
                className="text-gray-400 hover:text-white"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDownload(note)}
                className="text-gray-400 hover:text-white"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-white mb-2">AI Summary</h4>
            <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg">
              {note.summary}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">Key Questions</h4>
            <ul className="space-y-1">
              {note.questions.map((question, qIndex) => (
                <li key={qIndex} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  {question}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              note.type === 'ai-generated' 
                ? 'bg-purple-500/20 text-purple-300' 
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {note.type === 'ai-generated' ? 'AI Generated' : 'Manual'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(note.content)}
              className="text-gray-400 hover:text-white"
            >
              Copy Full Content
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NoteCard;