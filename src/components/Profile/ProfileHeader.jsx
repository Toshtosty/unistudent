import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Save, Edit } from 'lucide-react';

const ProfileHeader = ({ isEditing, onToggleEdit, onSave }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-gray-400">Manage your account and track your progress</p>
      </div>
      <Button
        onClick={isEditing ? onSave : onToggleEdit}
        className={`${
          isEditing 
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isEditing ? (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </>
        ) : (
          <>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default ProfileHeader;