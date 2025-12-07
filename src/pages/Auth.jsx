import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="min-h-screen flex w-full bg-white dark:bg-gray-900">
            {/* Left Side - Brand / Value Proposition */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-indigo-900 p-12 flex-col justify-between overflow-hidden"
            >
                {/* Decorative Circles */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                {/* Geometric Lines (Simulated with SVG or borders) */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20"
                    >
                        <Zap className="text-white w-8 h-8 fill-current" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        Hello<br />
                        <span className="text-neon-blue">HomePulse!</span>
                        <span className="inline-block ml-4 animate-bounce">👋</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-blue-100 text-xl max-w-lg leading-relaxed"
                    >
                        Skip the manual tracking. Automate your home energy management and save costs with real-time insights.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="relative z-10 text-sm text-blue-200"
                >
                    © 2025 HomePulse.
                </motion.div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white dark:bg-gray-950 relative"
            >
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Don't have an account? No problem, Google Sign-In creates one instantly.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Mock Email Input for visual parity with reference (Disabled/Read-only style) */}
                        <div className="space-y-4 opacity-50 pointer-events-none grayscale select-none" aria-hidden="true">
                            <div className="relative">
                                <span className="block text-sm text-gray-500 mb-1">Email Address</span>
                                <input type="email" value="demo@homepulse.app" readOnly className="w-full pb-2 border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none font-medium" />
                            </div>
                            <div className="relative mt-4">
                                <span className="block text-sm text-gray-500 mb-1">Password</span>
                                <input type="password" value="********" readOnly className="w-full pb-2 border-b border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none font-medium" />
                            </div>
                            <button className="w-full py-4 mt-6 bg-gray-900 text-white rounded-xl font-bold opacity-80 cursor-not-allowed">Login Now</button>

                            <div className="flex items-center gap-4 my-6">
                                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                                <span className="text-gray-400 text-sm">OR</span>
                                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                            </div>
                        </div>

                        {/* Real Google Button */}
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
                            className="w-full py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-white font-bold transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            <Chrome className="w-6 h-6 text-blue-500 fill-current" />
                            <span className="text-lg">Login with Google</span>
                        </motion.button>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20"
                            >
                                {error}
                            </motion.p>
                        )}

                        <div className="mt-8 text-center">
                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">Forgot password? Click here</a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
