import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Search, Plus } from 'lucide-react';
import { Helmet } from 'react-helmet';
import EventCard from '@/components/Events/EventCard';
import CreateEventForm from '@/components/Events/CreateEventForm';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('unimate_events'));
    if (storedEvents) {
      setEvents(storedEvents);
    } else {
      const mockEvents = [
        { id: 1, title: 'AI in Education Workshop', description: 'Learn about the latest AI tools transforming education', date: '2025-07-15', time: '14:00', location: 'Tech Hub, Room 101', attendees: 45, maxAttendees: 60, category: 'workshop', isRSVP: false, image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400' },
        { id: 2, title: 'Career Fair 2025', description: 'Meet top employers and explore career opportunities', date: '2025-07-20', time: '10:00', location: 'Main Auditorium', attendees: 120, maxAttendees: 200, category: 'career', isRSVP: true, image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400' },
        { id: 3, title: 'Hackathon 2025', description: '48-hour coding challenge with amazing prizes', date: '2025-07-25', time: '09:00', location: 'Innovation Center', attendees: 80, maxAttendees: 100, category: 'competition', isRSVP: false, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400' },
        { id: 4, title: 'Research Symposium', description: 'Present and discuss latest research findings', date: '2025-08-01', time: '13:00', location: 'Research Building', attendees: 35, maxAttendees: 50, category: 'academic', isRSVP: false, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }
      ];
      setEvents(mockEvents);
      localStorage.setItem('unimate_events', JSON.stringify(mockEvents));
    }
  }, []);

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem('unimate_events', JSON.stringify(newEvents));
  };

  const handleRSVP = (eventId) => {
    const newEvents = events.map(event => 
      event.id === eventId 
        ? { ...event, isRSVP: !event.isRSVP, attendees: event.isRSVP ? event.attendees - 1 : event.attendees + 1 }
        : event
    );
    updateEvents(newEvents);
    
    const event = events.find(e => e.id === eventId);
    toast({
      title: event?.isRSVP ? "RSVP Cancelled" : "RSVP Confirmed! 🎉",
      description: event?.isRSVP ? "You've cancelled your RSVP" : `You're registered for ${event?.title}`,
    });
  };

  const handleCreateEvent = (newEvent) => {
    const newEvents = [newEvent, ...events];
    updateEvents(newEvents);
    setShowCreateModal(false);
    toast({
      title: "Event Created! 🗓️",
      description: `"${newEvent.title}" has been added to the campus events.`,
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'career', label: 'Career' },
    { value: 'competition', label: 'Competitions' },
    { value: 'academic', label: 'Academic' }
  ];

  return (
    <>
      <Helmet>
        <title>Events - UniMate Pro</title>
        <meta name="description" content="Discover and RSVP to campus events, workshops, and activities." />
      </Helmet>
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Campus Events</h1>
            <p className="text-gray-400">Discover and join exciting campus activities</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={filter === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category.value)}
                className={filter === category.value 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-white/10 border-white/20 text-gray-300 hover:bg-white/20"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} onRSVP={handleRSVP} index={index} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Event</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new event to the campus calendar.
            </DialogDescription>
          </DialogHeader>
          <CreateEventForm 
            onSave={handleCreateEvent} 
            onCancel={() => setShowCreateModal(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Events;