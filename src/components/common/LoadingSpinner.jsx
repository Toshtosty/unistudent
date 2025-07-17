import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`text-blue-400 ${sizeClasses[size]}`} />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;