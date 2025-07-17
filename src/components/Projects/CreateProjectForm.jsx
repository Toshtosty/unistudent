import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';

const CreateProjectForm = ({ onSave, onCancel }) => {
  const { user } = useAuth();
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    techStack: '',
    tags: '',
    lookingFor: '',
    maxMembers: 4,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...projectData,
      id: Date.now(),
      techStack: projectData.techStack.split(',').map(s => s.trim()),
      tags: projectData.tags.split(',').map(s => s.trim()),
      lookingFor: projectData.lookingFor.split(',').map(s => s.trim()),
      creator: user.name,
      creatorAvatar: user.avatar,
      members: 1,
      status: 'planning',
      createdAt: new Date().toISOString().split('T')[0],
      isJoined: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">Project Title</Label>
        <Input id="title" name="title" value={projectData.title} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" placeholder="e.g., AI Study Assistant" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea id="description" name="description" value={projectData.description} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" placeholder="Describe your project idea..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="techStack" className="text-white">Tech Stack (comma-separated)</Label>
          <Input id="techStack" name="techStack" value={projectData.techStack} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" placeholder="React, Python, TensorFlow" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
          <Input id="tags" name="tags" value={projectData.tags} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" placeholder="AI, Education, Web App" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lookingFor" className="text-white">Looking For (comma-separated)</Label>
          <Input id="lookingFor" name="lookingFor" value={projectData.lookingFor} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" placeholder="Frontend Dev, UI/UX Designer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxMembers" className="text-white">Max Team Members</Label>
          <Input id="maxMembers" name="maxMembers" type="number" min="2" value={projectData.maxMembers} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600">Create Project</Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;