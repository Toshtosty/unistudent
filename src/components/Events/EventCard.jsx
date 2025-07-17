import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, Users, QrCode } from 'lucide-react';

const EventCard = ({ event, onRSVP, index }) => {
  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQR = async () => {
    try {
      const url = await QRCode.toDataURL(`unimate-event:${event.id}`);
      setQrCodeUrl(url);
      setShowQR(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case 'workshop': return 'bg-blue-500/80';
      case 'career': return 'bg-green-500/80';
      case 'competition': return 'bg-purple-500/80';
      default: return 'bg-orange-500/80';
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
      >
        <Card className="floating-card card-hover overflow-hidden h-full flex flex-col">
          <div className="relative h-48">
            <img  alt={`${event.title} event`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1691257790470-b5e4e80ca59f" />
            <div className="absolute top-4 right-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryClass(event.category)} text-white`}>
                {event.category}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col flex-grow">
            <CardHeader>
              <CardTitle className="text-white">{event.title}</CardTitle>
              <CardDescription className="text-gray-400">
                {event.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => onRSVP(event.id)}
                  className={`flex-1 ${
                    event.isRSVP 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {event.isRSVP ? 'Cancel RSVP' : 'RSVP'}
                </Button>
                {event.isRSVP && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={generateQR}
                    className="bg-white/10 border-white/20 hover:bg-white/20"
                  >
                    <QrCode className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Event QR Code</DialogTitle>
            <DialogDescription>
              Present this QR code at the event for check-in.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-4">
            {qrCodeUrl && <img src={qrCodeUrl} alt="Event QR Code" className="w-64 h-64 rounded-lg" />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;