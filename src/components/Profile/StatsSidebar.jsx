import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Settings, Award, BookOpen } from 'lucide-react';

const StatsSidebar = ({ stats, academicInfo, userRole }) => {
  const handleQuickAction = (feature) => {
    toast({
      title: `${feature} feature coming soon!`,
      description: "We're working hard to bring this to you.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="text-white">Statistics</CardTitle>
            <CardDescription className="text-gray-400">Your activity overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                </div>
                <span className="text-white font-semibold">{stat.value}</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="text-white">Academic Info</CardTitle>
            <CardDescription className="text-gray-400">Your academic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center"><span className="text-gray-400">GPA</span><span className="text-white font-semibold">{academicInfo.gpa}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-400">Year</span><span className="text-white font-semibold">{academicInfo.year}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-400">Major</span><span className="text-white font-semibold">{academicInfo.major}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-400">Role</span><span className="text-white font-semibold capitalize">{userRole}</span></div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="floating-card">
          <CardHeader><CardTitle className="text-white">Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-gray-300 hover:bg-white/20" onClick={() => handleQuickAction('Account Settings')}><Settings className="w-4 h-4 mr-2" />Account Settings</Button>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-gray-300 hover:bg-white/20" onClick={() => handleQuickAction('Achievements')}><Award className="w-4 h-4 mr-2" />View All Achievements</Button>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-gray-300 hover:bg-white/20" onClick={() => handleQuickAction('Data Export')}><BookOpen className="w-4 h-4 mr-2" />Export Data</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatsSidebar;