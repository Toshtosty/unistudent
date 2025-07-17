import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet';
import AiAnalysisForm from '@/components/Notes/AiAnalysisForm';
import NoteFilters from '@/components/Notes/NoteFilters';
import NoteCard from '@/components/Notes/NoteCard';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('unimate_notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    } else {
      const mockNotes = [
        { id: 1, title: 'Machine Learning Fundamentals', subject: 'Computer Science', content: 'Machine learning is a subset of artificial intelligence...', summary: 'Key concepts: supervised learning, unsupervised learning, neural networks.', questions: ['What is the difference between supervised and unsupervised learning?', 'How do neural networks work?'], createdAt: '2025-07-10', type: 'ai-generated' },
        { id: 2, title: 'Database Design Principles', subject: 'Computer Science', content: 'Database design involves creating a detailed data model...', summary: 'Important topics: normalization, ER diagrams, ACID properties.', questions: ['What are the benefits of normalization?', 'What are ACID properties?'], createdAt: '2025-07-08', type: 'manual' },
        { id: 3, title: 'Quantum Physics Basics', subject: 'Physics', content: 'Quantum physics describes the behavior of matter and energy...', summary: 'Core principles: wave-particle duality, uncertainty principle.', questions: ['What is wave-particle duality?', 'What are applications of quantum entanglement?'], createdAt: '2025-07-05', type: 'ai-generated' }
      ];
      setNotes(mockNotes);
      localStorage.setItem('unimate_notes', JSON.stringify(mockNotes));
    }
  }, []);

  const updateNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('unimate_notes', JSON.stringify(newNotes));
  };

  const processNewNote = (title, content, type, subject) => {
    setIsProcessing(true);
    setTimeout(() => {
      const newNote = {
        id: Date.now(),
        title,
        subject,
        content,
        summary: `AI-generated summary for "${title}" with key insights and main points.`,
        questions: [
          'What are the main topics covered?',
          'How do these concepts relate to each other?',
          'What are the practical applications?'
        ],
        createdAt: new Date().toISOString().split('T')[0],
        type
      };
      updateNotes([newNote, ...notes]);
      setIsProcessing(false);
      toast({
        title: type === 'ai-generated' ? "File processed! 🤖" : "Text analyzed! 🧠",
        description: `AI has analyzed your content and created a summary for "${title}".`,
      });
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processNewNote(file.name.replace('.pdf', ''), 'This is the extracted content from your uploaded file...', 'ai-generated', 'Uploaded Content');
    }
  };

  const handleTextSubmit = (text) => {
    processNewNote('Text Analysis', text, 'ai-generated', 'Manual Input');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied! 📋", description: "Content copied to clipboard" });
  };

  const shareNote = async (note) => {
    const shareData = {
      title: note.title,
      text: note.summary,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({ title: "Shared successfully! 🚀" });
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (err) {
      copyToClipboard(`${note.title}\n\n${note.summary}`);
      toast({ title: "Share not available", description: "Note content copied to clipboard instead." });
    }
  };

  const downloadNote = (note) => {
    const content = `Title: ${note.title}\nSubject: ${note.subject}\nDate: ${new Date(note.createdAt).toLocaleDateString()}\n\nSummary:\n${note.summary}\n\nKey Questions:\n${note.questions.join('\n')}\n\nFull Content:\n${note.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/\s/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Download Started! 📥" });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || note.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Helmet>
        <title>AI Notes - UniMate Pro</title>
        <meta name="description" content="Upload documents and get AI-powered summaries and insights for your studies." />
      </Helmet>
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">AI Notes Summarizer</h1>
          <p className="text-gray-400">Upload documents or paste text for AI-powered analysis</p>
        </motion.div>

        <AiAnalysisForm 
          onFileUpload={handleFileUpload}
          onTextSubmit={handleTextSubmit}
          isProcessing={isProcessing}
        />

        <NoteFilters 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          filter={filter}
          onFilterChange={setFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNotes.map((note, index) => (
            <NoteCard 
              key={note.id}
              note={note}
              onCopy={copyToClipboard}
              onShare={shareNote}
              onDownload={downloadNote}
              index={index}
            />
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No notes found</h3>
            <p className="text-gray-400">Upload a document or paste text to get started</p>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Notes;