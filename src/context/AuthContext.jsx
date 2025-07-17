import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('unimate_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const mockUsers = JSON.parse(localStorage.getItem('unimate_users') || '[]');
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      if (!foundUser.emailVerified) {
        throw new Error('Please verify your email before logging in.');
      }

      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        avatar: foundUser.avatar,
        emailVerified: foundUser.emailVerified,
      };

      setUser(userSession);
      localStorage.setItem('unimate_user', JSON.stringify(userSession));
      
      toast({
        title: "Welcome back! 🎉",
        description: `Logged in successfully as ${foundUser.role}.`,
        variant: "success",
      });

      return userSession;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      const mockUsers = JSON.parse(localStorage.getItem('unimate_users') || '[]');
      
      if (mockUsers.find(u => u.email === userData.email)) {
        throw new Error('User with this email already exists');
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
        createdAt: new Date().toISOString(),
        emailVerified: false,
      };

      mockUsers.push(newUser);
      localStorage.setItem('unimate_users', JSON.stringify(mockUsers));
      
      toast({
        title: "Account created! 🚀",
        description: "Please check your email to verify your account.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email) => {
    try {
      const mockUsers = JSON.parse(localStorage.getItem('unimate_users') || '[]');
      const userIndex = mockUsers.findIndex(u => u.email === email);

      if (userIndex === -1) {
        return false;
      }

      mockUsers[userIndex].emailVerified = true;
      localStorage.setItem('unimate_users', JSON.stringify(mockUsers));
      return true;
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unimate_user');
    toast({
      title: "Logged out",
      description: "See you soon! 👋",
    });
  };

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    verifyEmail,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};