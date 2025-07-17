import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const ProjectFilters = ({ searchTerm, onSearchChange, filter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'available', label: 'Available' },
    { value: 'joined', label: 'My Projects' },
    { value: 'active', label: 'Active' },
    { value: 'planning', label: 'Planning' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects, tech, or tags..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(f.value)}
            className={filter === f.value 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-white/10 border-white/20 text-gray-300 hover:bg-white/20"
            }
          >
            {f.label}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectFilters;