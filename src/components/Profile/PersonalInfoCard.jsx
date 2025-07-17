import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera } from 'lucide-react';

const PersonalInfoCard = ({ user, profileData, isEditing, onInputChange, onSelectChange, onAvatarChange, onAddSkill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="floating-card">
        <CardHeader>
          <CardTitle className="text-white">Personal Information</CardTitle>
          <CardDescription className="text-gray-400">Your basic profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full border-4 border-blue-500" />
              {isEditing && (
                <Button size="icon" onClick={onAvatarChange} className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{profileData.name}</h3>
              <p className="text-gray-400 capitalize">{user?.role}</p>
              <p className="text-blue-400">{profileData.major} • {profileData.year}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Full Name</Label>
              {isEditing ? <Input value={profileData.name} onChange={(e) => onInputChange('name', e.target.value)} className="bg-white/10 border-white/20 text-white" /> : <p className="text-gray-300 p-2 bg-white/5 rounded-lg">{profileData.name}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-white">Email</Label>
              <p className="text-gray-300 p-2 bg-white/5 rounded-lg">{profileData.email}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Major</Label>
              {isEditing ? <Input value={profileData.major} onChange={(e) => onInputChange('major', e.target.value)} className="bg-white/10 border-white/20 text-white" /> : <p className="text-gray-300 p-2 bg-white/5 rounded-lg">{profileData.major}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-white">Academic Year</Label>
              {isEditing ? (
                <Select value={profileData.year} onValueChange={(value) => onSelectChange('year', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Freshman">Freshman</SelectItem>
                    <SelectItem value="Sophomore">Sophomore</SelectItem>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              ) : <p className="text-gray-300 p-2 bg-white/5 rounded-lg">{profileData.year}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Bio</Label>
            {isEditing ? <Textarea value={profileData.bio} onChange={(e) => onInputChange('bio', e.target.value)} className="w-full h-24 bg-white/10 border-white/20 text-white resize-none" /> : <p className="text-gray-300 p-3 bg-white/5 rounded-lg">{profileData.bio}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Skills</Label>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">{skill}</span>
              ))}
              {isEditing && <Button variant="outline" size="sm" onClick={onAddSkill} className="bg-white/10 border-white/20 text-gray-300 hover:bg-white/20">+ Add Skill</Button>}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoCard;