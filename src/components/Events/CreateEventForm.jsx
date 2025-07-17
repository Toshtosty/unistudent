import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CreateEventForm = ({ onSave, onCancel }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    category: 'workshop',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setEventData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...eventData,
      id: Date.now(),
      attendees: 0,
      isRSVP: false,
      image: `https://source.unsplash.com/random/400x300?event,${eventData.category}`
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">Event Title</Label>
        <Input id="title" name="title" value={eventData.title} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea id="description" name="description" value={eventData.description} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-white">Date</Label>
          <Input id="date" name="date" type="date" value={eventData.date} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time" className="text-white">Time</Label>
          <Input id="time" name="time" type="time" value={eventData.time} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location" className="text-white">Location</Label>
        <Input id="location" name="location" value={eventData.location} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maxAttendees" className="text-white">Max Attendees</Label>
          <Input id="maxAttendees" name="maxAttendees" type="number" value={eventData.maxAttendees} onChange={handleChange} required className="bg-white/10 border-white/20 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">Category</Label>
          <Select name="category" value={eventData.category} onValueChange={handleSelectChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="competition">Competition</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">Create Event</Button>
      </div>
    </form>
  );
};

export default CreateEventForm;