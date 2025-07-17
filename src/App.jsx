import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import Layout from '@/components/Layout/Layout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const VerifyEmail = lazy(() => import('@/pages/VerifyEmail'));
const HandleVerification = lazy(() => import('@/pages/HandleVerification'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Events = lazy(() => import('@/pages/Events'));
const Notes = lazy(() => import('@/pages/Notes'));
const Projects = lazy(() => import('@/pages/Projects'));
const Profile = lazy(() => import('@/pages/Profile'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/verify" element={<HandleVerification />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route
                    path="/*"
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <Suspense fallback={<div className="flex-grow flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
                            <Routes>
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/events" element={<Events />} />
                              <Route path="/notes" element={<Notes />} />
                              <Route path="/projects" element={<Projects />} />
                              <Route path="/profile" element={<Profile />} />
                            </Routes>
                          </Suspense>
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Toaster />
              </div>
            </Suspense>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;