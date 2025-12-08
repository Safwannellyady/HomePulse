import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Auth = () => {
    const { loginWithGoogle, loginGuest } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isGuestLoading, setIsGuestLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleGoogleLogin = async () => {
        setError('');
        setIsGoogleLoading(true);
        try {
            const result = await loginWithGoogle();
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleGuestLogin = () => {
        setIsGuestLoading(true);
        // Simulate network delay for "Manual Login" experience
        setTimeout(() => {
            loginGuest();
            navigate('/dashboard');
        }, 800);
    };

    return (
        <div className="min-h-screen flex w-full bg-black font-sans overflow-hidden relative">
            {/* ... (rest of the component remains similar, just updating the button part below) */}
            {/* Animated Background Mesh (Global) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple/30 blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-blue/30 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Left Side - Visuals */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-12 lg:p-16"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                        <Zap className="text-white w-7 h-7 fill-current" />
                    </div>
                    <span className="text-3xl font-bold text-white tracking-wide">Home<span className="text-neon-blue">Pulse</span></span>
                </div>

                <div className="relative">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                            Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Smart Living</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                            Monitor energy, optimize usage, and save costs with our AI-powered home dashboard. Join the revolution today.
                        </p>
                    </motion.div>

                    {/* Floating Cards Animation */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-0 top-0 translate-x-12 -translate-y-12 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 w-48 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Savings</p>
                                <p className="text-sm font-bold text-white">+ 24% Efficiency</p>
                            </div>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[70%] bg-green-500"></div>
                        </div>
                    </motion.div>
                </div>

                <div className="text-sm text-gray-500">
                    © 2025 HomePulse Inc. All rights reserved.
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-glass-surface/30 backdrop-blur-sm border-l border-white/5 relative z-10"
            >
                <div className="w-full max-w-md bg-black/40 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400">Enter your credentials to access your dashboard</p>
                    </div>

                    <div className="space-y-6">
                        {/* Inputs */}
                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                                <input
                                    type="email"
                                    defaultValue="demo@homepulse.app"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-purple transition-colors" />
                                <input
                                    type="password"
                                    defaultValue="demo123"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 bg-white/5 text-neon-blue focus:ring-neon-blue"
                                />
                                <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-neon-blue hover:text-white transition-colors">Forgot password?</a>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <button
                                onClick={handleGuestLogin}
                                className="w-full py-3.5 bg-gradient-to-r from-neon-blue to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-neon-blue/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isGuestLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
                            </button>

                            <div className="relative flex items-center gap-4 py-2">
                                <div className="h-px bg-white/10 flex-1"></div>
                                <span className="text-xs text-gray-500 uppercase tracking-widest">Or continue with</span>
                                <div className="h-px bg-white/10 flex-1"></div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                disabled={isGoogleLoading || isGuestLoading}
                                className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGoogleLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="none" d="M1 1h22v22H1z" /></svg>
                                        <span>{isGoogleLoading ? 'Connecting...' : 'Google'}</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>
                        )}

                        <p className="text-center text-sm text-gray-400 mt-6">
                            Don't have an account? <a href="#" className="font-bold text-white hover:text-neon-blue transition-colors">Sign up for free</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
