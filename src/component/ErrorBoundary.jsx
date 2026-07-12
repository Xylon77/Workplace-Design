import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Workspace Engine Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
          <div className="text-center bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-xl">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-white">System Fault Detected</h2>
            <p className="text-sm text-slate-400 mt-2 mb-6">The workspace encountered a rendering error. Please refresh your session.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-teal-500/30 transition-all"
            >
              Reload Environment
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;