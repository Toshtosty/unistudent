import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-slate-900 via-red-900 to-rose-900 text-white">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg text-gray-300 mb-6 max-w-md">
            We've encountered an unexpected error. Please try refreshing the page. If the problem persists, please contact support.
          </p>
          <Button onClick={() => window.location.reload()} className="bg-white text-slate-900 hover:bg-gray-200">
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;