import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

const Auth = () => {
    const { loginWithGoogle, loginGuest } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isGuestLoading, setIsGuestLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleGoogleLogin = async () => {
        const result = await loginWithGoogle();
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Failed to sign in via Google');
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
        <div className="min-h-screen flex w-full bg-white dark:bg-gray-900 font-sans">
            {/* Left Side - Brand / Value Proposition */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex lg:w-1/2 relative bg-blue-600 p-12 flex-col justify-between overflow-hidden"
            >
                {/* Decorative Elements matching previous "Premium" feel but adapted */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                            <Zap className="text-white w-6 h-6 fill-current" />
                        </div>
                        <span className="text-white font-bold text-2xl tracking-wide">HomePulse</span>
                    </div>

                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                        Start your <br />
                        Journey with us.
                    </h1>
                    <p className="text-blue-100 text-lg max-w-md">
                        Discover the world's best community of freelancers and business owners.
                    </p>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 mt-12 w-3/4">
                    <p className="text-white italic mb-4">"Simply the best tool to manage my home energy. Highly recommended!"</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div>
                            <p className="text-white font-semibold text-sm">Karen Song</p>
                            <p className="text-blue-200 text-xs">Homeowner</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white dark:bg-gray-950"
            >
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <p className="text-gray-500 dark:text-gray-400 mb-2">Please enter your details</p>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Inputs */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                                <input
                                    type="email"
                                    defaultValue="demo@homepulse.app"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <input
                                    type="password"
                                    defaultValue="demo123"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-600 dark:text-gray-400">Remember for 30 days</span>
                            </label>
                            <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Forgot password</a>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleGuestLogin}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all flex justify-center items-center"
                            >
                                {isGuestLoading ? 'Signing in...' : 'Sign in'}
                            </button>

                            <button
                                onClick={handleGoogleLogin}
                                className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                            >
                                <Chrome className="w-5 h-5 text-gray-900 dark:text-white fill-current" />
                                {/* Note: Using fill-current on Lucide Chrome icon doesn't give colors, but sticking to clean monochrome or colored G icon is better. Reverting to colored Google G manually or keeping generic. */}
                                <span className="text-blue-500"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="none" d="M1 1h22v22H1z" /></svg></span>
                                Sign in with Google
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                        )}

                        <p className="text-center text-sm text-gray-500">
                            Don't have an account? <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Sign up</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
