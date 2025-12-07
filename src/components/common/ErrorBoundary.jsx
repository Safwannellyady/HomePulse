import React from 'react';

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
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-10">
                    <div className="max-w-lg text-center">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h1>
                        <p className="text-gray-300 mb-8">The application encountered an unexpected error.</p>
                        <div className="bg-black/50 p-4 rounded text-left overflow-auto max-h-64 border border-red-500/30 mb-8">
                            <code className="text-xs text-red-300 font-mono">
                                {this.state.error && this.state.error.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('homepulse_user_guest');
                                window.location.href = '/';
                            }}
                            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
                        >
                            Reset App (Clear Session)
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
