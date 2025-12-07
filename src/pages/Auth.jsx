import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(form.email, form.password);
            navigate('/dashboard');
        } else {
            signup({ name: form.name, email: form.email });
            navigate('/onboarding');
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
                    <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-gray-400">{isLogin ? 'Control your energy, anywhere.' : 'Join the smart energy revolution.'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-blue focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    )}

                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-blue focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-blue focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-blue transition-colors" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-blue focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-blue to-cyan-500 text-black font-bold hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2 group"
                    >
                        {isLogin ? 'Sign In' : 'Get Started'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
