import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Users, 
  TrendingUp,
  Award
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats] = useState({
    eventsAttended: 12,
    notesCreated: 25,
    projectsJoined: 4,
    xpPoints: 1250
  });

  const quickActions = [
    {
      icon: Calendar,
      title: 'Upcoming Events',
      description: 'View and RSVP to events',
      color: 'from-blue-500 to-cyan-500',
      path: '/events'
    },
    {
      icon: FileText,
      title: 'AI Notes',
      description: 'Summarize your lectures',
      color: 'from-purple-500 to-pink-500',
      path: '/notes'
    },
    {
      icon: Users,
      title: 'Find Projects',
      description: 'Collaborate with peers',
      color: 'from-green-500 to-emerald-500',
      path: '/projects'
    },
    {
      icon: TrendingUp,
      title: 'Profile & Stats',
      description: 'Track your progress',
      color: 'from-orange-500 to-red-500',
      path: '/profile'
    }
  ];

  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Events Attended',
        data: [2, 4, 3, 5, 2, 6],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const projectData = {
    labels: ['Completed', 'In Progress', 'Planning'],
    datasets: [
      {
        data: [8, 3, 2],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - UniMate Pro</title>
        <meta name="description" content="Your personalized dashboard with analytics, quick actions, and progress tracking." />
      </Helmet>
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening in your academic journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Calendar, label: 'Events Attended', value: stats.eventsAttended, color: 'text-blue-400' },
            { icon: FileText, label: 'Notes Created', value: stats.notesCreated, color: 'text-purple-400' },
            { icon: Users, label: 'Projects Joined', value: stats.projectsJoined, color: 'text-green-400' },
            { icon: Award, label: 'XP Points', value: stats.xpPoints, color: 'text-orange-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="floating-card card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="floating-card card-hover cursor-pointer" onClick={() => navigate(action.path)}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="floating-card">
              <CardHeader>
                <CardTitle className="text-white">Event Attendance</CardTitle>
                <CardDescription className="text-gray-400">
                  Your event participation over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Line data={attendanceData} options={chartOptions} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="floating-card">
              <CardHeader>
                <CardTitle className="text-white">Project Status</CardTitle>
                <CardDescription className="text-gray-400">
                  Overview of your project involvement
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <Doughnut data={projectData} options={doughnutOptions} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="floating-card">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">
                Your latest actions and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: Calendar, text: 'Attended "AI in Education" workshop', time: '2 hours ago', color: 'text-blue-400' },
                  { icon: FileText, text: 'Created notes for Machine Learning lecture', time: '1 day ago', color: 'text-purple-400' },
                  { icon: Users, text: 'Joined "Web Development" project team', time: '2 days ago', color: 'text-green-400' },
                  { icon: Award, text: 'Earned 50 XP points for active participation', time: '3 days ago', color: 'text-orange-400' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.text}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;