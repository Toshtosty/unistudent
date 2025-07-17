import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-auto p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;