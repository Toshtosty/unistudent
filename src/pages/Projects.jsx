import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus } from 'lucide-react';
import { Helmet } from 'react-helmet';
import ProjectCard from '@/components/Projects/ProjectCard';
import CreateProjectForm from '@/components/Projects/CreateProjectForm';
import ProjectFilters from '@/components/Projects/ProjectFilters';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('unimate_projects'));
    if (storedProjects) {
      setProjects(storedProjects);
    } else {
      const mockProjects = [
        { id: 1, title: 'AI-Powered Study Assistant', description: 'Building an intelligent study companion...', techStack: ['React', 'Python', 'TensorFlow'], tags: ['AI', 'Education'], creator: 'Sarah Johnson', creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', lookingFor: ['Backend Dev', 'UI/UX Designer'], members: 3, maxMembers: 5, status: 'active', createdAt: '2025-07-10', isJoined: false },
        { id: 2, title: 'Campus Event Management System', description: 'A comprehensive platform for managing campus events...', techStack: ['Vue.js', 'Node.js', 'MongoDB'], tags: ['Web Dev', 'Events'], creator: 'Mike Chen', creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike', lookingFor: ['Frontend Dev'], members: 2, maxMembers: 4, status: 'active', createdAt: '2025-07-08', isJoined: true },
        { id: 3, title: 'Sustainable Campus Initiative', description: 'Developing a mobile app to track and gamify sustainable practices...', techStack: ['React Native', 'Firebase'], tags: ['Sustainability', 'Mobile'], creator: 'Emma Davis', creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', lookingFor: ['Data Analyst'], members: 4, maxMembers: 6, status: 'planning', createdAt: '2025-07-05', isJoined: false },
      ];
      setProjects(mockProjects);
      localStorage.setItem('unimate_projects', JSON.stringify(mockProjects));
    }
  }, []);

  const updateProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('unimate_projects', JSON.stringify(newProjects));
  };

  const handleJoinRequest = (projectId) => {
    const newProjects = projects.map(p => p.id === projectId ? { ...p, isJoined: !p.isJoined } : p);
    updateProjects(newProjects);
    
    const project = projects.find(p => p.id === projectId);
    toast({
      title: project?.isJoined ? "Left Project" : "Join Request Sent! 🚀",
      description: project?.isJoined ? `You've left the "${project?.title}" team.` : `Your request to join "${project?.title}" has been sent.`,
    });
  };

  const handleCreateProject = (newProject) => {
    const newProjects = [newProject, ...projects];
    updateProjects(newProjects);
    setShowCreateModal(false);
    toast({
      title: "Project Created! ✨",
      description: `Your project "${newProject.title}" is now live.`,
    });
  };

  const openChat = () => {
    toast({ title: "Real-time chat coming soon!" });
  };

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = project.title.toLowerCase().includes(searchLower) ||
                         project.description.toLowerCase().includes(searchLower) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchLower)) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchLower));
    const matchesFilter = filter === 'all' || (filter === 'joined' && project.isJoined) || (filter === 'available' && !project.isJoined) || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Helmet>
        <title>Projects - UniMate Pro</title>
        <meta name="description" content="Find and collaborate on exciting student projects." />
      </Helmet>
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Project Collaborator</h1>
            <p className="text-gray-400">Find teammates and join exciting projects</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </motion.div>

        <ProjectFilters 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          filter={filter}
          onFilterChange={setFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onJoin={handleJoinRequest} 
              onChat={openChat} 
              index={index} 
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">Try adjusting your search or create a new project</p>
          </motion.div>
        )}
      </div>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Share your project idea and find collaborators.
            </DialogDescription>
          </DialogHeader>
          <CreateProjectForm 
            onSave={handleCreateProject} 
            onCancel={() => setShowCreateModal(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Projects;