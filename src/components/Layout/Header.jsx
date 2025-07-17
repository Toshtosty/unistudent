import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  LogOut,
  Settings,
  User
} from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-gray-300 hover:text-white"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </Button>

        <DropdownMenu>
          <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full border-2 border-blue-500"
            />
            <div className="text-sm">
              <p className="font-medium text-white">{user?.name}</p>
              <p className="text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="text-gray-300 hover:text-red-400"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;