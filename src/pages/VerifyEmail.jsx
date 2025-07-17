import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MailCheck } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email;

  const handleResend = () => {
    toast({
      title: "Verification Link Sent! 📨",
      description: `A new verification link has been sent to ${email || 'your email address'}.`,
    });
  };

  const verificationLink = email ? `/verify?email=${encodeURIComponent(email)}` : '/login';

  return (
    <>
      <Helmet>
        <title>Verify Your Email - UniMate Pro</title>
        <meta name="description" content="Check your email to verify your UniMate Pro account." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="floating-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MailCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white">Check Your Inbox!</CardTitle>
              <CardDescription className="text-gray-400">
                We've sent a verification link to your email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {email && (
                <p className="text-white bg-white/10 p-3 rounded-lg">
                  A verification link has been sent to <span className="font-bold text-blue-300">{email}</span>.
                </p>
              )}
              <p className="text-gray-400 text-sm">
                Please click the link in that email to complete your registration. If you don't see it, you may need to check your spam folder.
              </p>
              
              <div className="text-center text-sm text-gray-400">
                <p>For demonstration purposes, click the link below to verify:</p>
                <Link to={verificationLink} className="text-blue-400 hover:text-blue-300 font-medium underline">
                  Verify My Email Address
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleResend}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Resend Verification Link
                </Button>
                <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-gray-300 hover:bg-white/20">
                  <Link to="/login">Back to Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default VerifyEmail;