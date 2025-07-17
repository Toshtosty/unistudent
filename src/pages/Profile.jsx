import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Award, BookOpen, Users } from 'lucide-react';
import { Helmet } from 'react-helmet';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import PersonalInfoCard from '@/components/Profile/PersonalInfoCard';
import AchievementsCard from '@/components/Profile/AchievementsCard';
import StatsSidebar from '@/components/Profile/StatsSidebar';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    year: '',
    major: '',
    skills: []
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem(`unimate_profile_${user.id}`));
    const initialProfile = {
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Computer Science student passionate about AI and web development. Eager to learn and collaborate.',
      year: 'Junior',
      major: 'Computer Science',
      skills: ['React', 'Python', 'Machine Learning', 'Node.js']
    };
    setProfileData(storedProfile || initialProfile);
  }, [user]);

  const updateProfile = (newProfileData) => {
    setProfileData(newProfileData);
    localStorage.setItem(`unimate_profile_${user.id}`, JSON.stringify(newProfileData));
  };

  const handleSave = () => {
    setIsEditing(false);
    updateProfile(profileData);
    toast({
      title: "Profile Updated! ✨",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    const newSkill = prompt("Enter a new skill:");
    if (newSkill && !profileData.skills.includes(newSkill)) {
      updateProfile({ ...profileData, skills: [...profileData.skills, newSkill] });
    }
  };

  const handleChangeAvatar = () => {
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`;
    const updatedUser = { ...user, avatar: newAvatar };
    setUser(updatedUser);
    localStorage.setItem('unimate_user', JSON.stringify(updatedUser));
    toast({ title: "Avatar Changed! 📸" });
  };

  const stats = [
    { icon: Calendar, label: 'Events Attended', value: '12', color: 'text-blue-400' },
    { icon: BookOpen, label: 'Notes Created', value: '25', color: 'text-purple-400' },
    { icon: Users, label: 'Projects Joined', value: '4', color: 'text-green-400' },
    { icon: Award, label: 'XP Points', value: '1,250', color: 'text-orange-400' }
  ];

  const achievements = [
    { title: 'Early Adopter', description: 'One of the first 100 users', icon: '🚀', date: '2025-01-01' },
    { title: 'Note Master', description: 'Created 25+ AI notes', icon: '📚', date: '2025-01-10' },
    { title: 'Event Enthusiast', description: 'Attended 10+ events', icon: '🎉', date: '2025-01-15' },
    { title: 'Team Player', description: 'Joined 3+ projects', icon: '🤝', date: '2025-01-20' }
  ];

  return (
    <>
      <Helmet>
        <title>Profile - UniMate Pro</title>
        <meta name="description" content="Manage your profile, view achievements, and track your academic progress." />
      </Helmet>
      
      <div className="space-y-6">
        <ProfileHeader 
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(true)}
          onSave={handleSave}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard 
              user={user}
              profileData={profileData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onSelectChange={handleInputChange}
              onAvatarChange={handleChangeAvatar}
              onAddSkill={handleAddSkill}
            />
            <AchievementsCard achievements={achievements} />
          </div>

          <StatsSidebar 
            stats={stats}
            academicInfo={{ gpa: '3.8', year: profileData.year, major: profileData.major }}
            userRole={user?.role}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;