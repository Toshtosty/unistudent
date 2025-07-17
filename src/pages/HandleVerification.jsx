import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';

const HandleVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const email = searchParams.get('email');
    if (!email) {
      setStatus('error');
      toast({
        title: "Verification Failed",
        description: "No email provided for verification.",
        variant: "destructive",
      });
      return;
    }

    const performVerification = async () => {
      const success = await verifyEmail(email);
      if (success) {
        setStatus('success');
        toast({
          title: "Email Verified! ✅",
          description: "Your account is now active. Redirecting to login...",
          variant: "success",
        });
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setStatus('error');
        toast({
          title: "Verification Failed",
          description: "The verification link is invalid or has expired.",
          variant: "destructive",
        });
      }
    };

    performVerification();
  }, [searchParams, navigate, verifyEmail]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 text-blue-400 mx-auto"
            >
              <Loader2 className="w-full h-full" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mt-4">Verifying your email...</h1>
            <p className="text-gray-400">Please wait a moment.</p>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h1 className="text-2xl font-bold text-white mt-4">Verification Successful!</h1>
            <p className="text-gray-400">You will be redirected to the login page shortly.</p>
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className="w-16 h-16 text-red-400 mx-auto" />
            <h1 className="text-2xl font-bold text-white mt-4">Verification Failed</h1>
            <p className="text-gray-400">The link may be invalid or expired. Please try again.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Email Verification - UniMate Pro</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center p-8 floating-card rounded-2xl"
        >
          {renderContent()}
        </motion.div>
      </div>
    </>
  );
};

export default HandleVerification;