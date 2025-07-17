import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Users, Clock, Tag, MessageCircle } from 'lucide-react';

const ProjectCard = ({ project, onJoin, onChat, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'planning': return 'bg-yellow-500/20 text-yellow-300';
      case 'completed': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
    >
      <Card className="floating-card card-hover h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-white flex items-center gap-2">
                <Code className="w-5 h-5" />
                {project.title}
              </CardTitle>
              <CardDescription className="text-gray-400 mt-2">
                {project.description}
              </CardDescription>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={project.creatorAvatar}
                alt={project.creator}
                className="w-8 h-8 rounded-full border-2 border-blue-500"
              />
              <div>
                <p className="text-white text-sm font-medium">{project.creator}</p>
                <p className="text-gray-400 text-xs">Project Creator</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-white text-sm font-medium mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs flex items-center gap-1"><Tag className="w-3 h-3" />{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium mb-2">Looking For</h4>
                <div className="flex flex-wrap gap-1">
                  {project.lookingFor.map((role, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-md text-xs">{role}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between pt-3 border-t border-white/10 mb-4">
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>{project.members}/{project.maxMembers}</span></div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{new Date(project.createdAt).toLocaleDateString()}</span></div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onJoin(project.id)}
                className={`flex-1 ${
                  project.isJoined 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                }`}
              >
                {project.isJoined ? 'Leave Project' : 'Request to Join'}
              </Button>
              {project.isJoined && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onChat(project.id)}
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;