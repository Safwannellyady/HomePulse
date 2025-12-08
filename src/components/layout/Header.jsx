import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings as SettingsIcon, ChevronDown, Award } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { showToast } = useToast();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    return (
        <header className="h-20 bg-black/20 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
            {/* Title / Breadcrumb */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {user?.name?.split(' ')[0] || 'User'}</p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10 focus-within:border-neon-blue/50 transition-colors">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search appliance..."
                        className="bg-transparent border-none outline-none text-sm text-white ml-2 w-48 placeholder-gray-500"
                    />
                </div>

                {/* Notifications */}
                <button
                    onClick={() => showToast("No new notifications.", "info")}
                    className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-neon-purple rounded-full shadow-[0_0_8px_#bc13fe]"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-6 border-l border-white/10 group focus:outline-none"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-white group-hover:text-neon-blue transition-colors">
                                {user?.name || 'Safwan'}
                            </p>
                            <p className="text-xs text-neon-blue">{user?.isPremium ? 'Premium User' : 'Basic Plan'}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${user?.isPremium ? 'from-amber-400 to-yellow-600' : 'from-gray-700 to-gray-600'} border border-white/20 flex items-center justify-center overflow-hidden`}>
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 text-gray-300" />
                            )}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                        <div className="absolute right-0 top-12 w-64 bg-glass-surface border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-fade-in-up">
                            <div className="p-3 border-b border-white/10 mb-2">
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Energy Score</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Award className="w-5 h-5 text-neon-purple" />
                                    <span className="text-xl font-bold text-white">Top 5%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                                    <div className="w-[95%] h-full bg-neon-purple rounded-full"></div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setShowModal(true);
                                    setIsProfileOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <User className="w-4 h-4" /> My Account
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors">
                                <SettingsIcon className="w-4 h-4" /> Settings
                            </button>
                            <div className="h-px bg-white/5 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    </>
                    )}
                </div>
            </div>

            {/* Profile Modal Rendered Here */}
            {showModal && (
                <ProfileModal
                    user={user}
                    onClose={() => setShowModal(false)}
                    onLogout={handleLogout}
                />
            )}
        </div>
        </header >
    );
};

// Profile Modal Component
const ProfileModal = ({ user, onClose, onLogout }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/20 blur-[60px] rounded-full pointer-events-none"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-neon-blue" /> User Profile
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white bg-white/10">
                                    {user?.name?.[0] || 'U'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{user?.name || 'Guest User'}</h3>
                        <p className="text-sm text-gray-400">{user?.email || 'guest@homepulse.app'}</p>
                    </div>
                </div>

                {/* Connection Details */}
                <div className="space-y-4 mb-8 relative z-10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Connection Details</h3>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Provider</span>
                            <span className="text-white font-medium flex items-center gap-2">
                                <Award className="w-4 h-4 text-neon-blue" /> {user?.provider || 'N/A'}
                            </span>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Consumer ID</span>
                            <span className="text-white font-mono text-sm tracking-wide">{user?.meterId || 'Not Linked'}</span>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">IoT Device Key</span>
                            <span className="text-white font-mono text-sm tracking-wide flex items-center gap-2">
                                <span className="text-neon-purple">●●●●</span>
                                {user?.iotKey ? user.iotKey.slice(-4) : 'None'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 relative z-10">
                    <button
                        onClick={onLogout}
                        className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl transition-colors border border-red-500/20"
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors border border-white/10"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
