import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Chrome } from 'lucide-react';

const Auth = () => {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        const success = await loginWithGoogle();
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Failed to sign in via Google');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-neon-purple/20 rounded-full blur-[150px] -z-10"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-neon-blue/20 rounded-full blur-[150px] -z-10"></div>

            <div className="w-full max-w-md p-8 bg-glass-surface border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl animate-fade-in-up">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center shadow-lg shadow-neon-blue/20 mx-auto mb-4">
                        <Zap className="text-white w-8 h-8 fill-current" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to HomePulse</h2>
                    <p className="text-gray-400">Smart Energy Management, Simplified.</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-3.5 rounded-xl bg-white text-black font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-3 group"
                    >
                        {/* Chrome icon as proxy for Google G logo */}
                        <Chrome className="w-5 h-5 text-blue-500" />
                        Sign in with Google
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-auto text-gray-400" />
                    </button>

                    {error && (
                        <p className="text-red-400 text-sm text-center mt-2">{error}</p>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
