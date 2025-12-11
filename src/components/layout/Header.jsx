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
                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" onClick={() => setIsProfileOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-4 w-72 bg-[#1a1a2e] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in-up origin-top-right overflow-hidden">
                                <div className="p-4 border-b border-white/10 mb-2 bg-white/5 -mx-2 -mt-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold text-white mb-1">{user?.name || 'Guest User'}</p>
                                            <p className="text-xs text-gray-400">{user?.email}</p>
                                        </div>
                                        <div className="bg-neon-blue/10 px-2 py-1 rounded text-[10px] text-neon-blue font-bold uppercase tracking-wider">
                                            {user?.isPremium ? 'PRO' : 'FREE'}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">Energy Score</span>
                                            <span className="text-neon-purple font-bold">Top 5%</span>
                                        </div>
                                        <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                                            <div className="w-[95%] h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowModal(true);
                                        setIsProfileOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-lg flex items-center gap-3 transition-colors font-medium"
                                >
                                    <User className="w-4 h-4 text-gray-400" /> My Profile
                                </button>
                                <button className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-lg flex items-center gap-3 transition-colors font-medium">
                                    <SettingsIcon className="w-4 h-4 text-gray-400" /> App Settings
                                </button>
                                <div className="h-px bg-white/5 my-1 mx-2"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors font-medium"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
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
        </header>
    );
};

// Profile Modal Component (Editable)
const ProfileModal = ({ user, onClose, onLogout }) => {
    const { updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        provider: user?.provider || '',
        meterId: user?.meterId || '',
        iotKey: user?.iotKey || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateUserProfile(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/20 blur-[60px] rounded-full pointer-events-none"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-neon-blue" />
                        {isEditing ? 'Edit Profile' : 'User Profile'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* User Info (Name/Email) */}
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 p-[2px] flex-shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white bg-white/10">
                                    {formData.name?.[0] || 'U'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-2">
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-neon-blue outline-none"
                                    placeholder="Full Name"
                                />
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-300 text-xs focus:border-neon-blue outline-none"
                                    placeholder="Email Address"
                                />
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-white">{user?.name || 'Guest User'}</h3>
                                <p className="text-sm text-gray-400">{user?.email || 'guest@homepulse.app'}</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Connection Details */}
                <div className="space-y-4 mb-8 relative z-10">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Connection Details</h3>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                        {/* Provider */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Provider</span>
                            {isEditing ? (
                                <select
                                    name="provider"
                                    value={formData.provider}
                                    onChange={handleChange}
                                    className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm outline-none"
                                >
                                    <option value="">Select</option>
                                    <option value="BESCOM">BESCOM</option>
                                    <option value="MESCOM">MESCOM</option>
                                    <option value="TATA POWER">TATA POWER</option>
                                    <option value="ADANI">ADANI</option>
                                </select>
                            ) : (
                                <span className="text-white font-medium flex items-center gap-2">
                                    <Award className="w-4 h-4 text-neon-blue" /> {user?.provider || 'N/A'}
                                </span>
                            )}
                        </div>
                        <div className="h-px bg-white/5"></div>

                        {/* Consumer ID */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Consumer ID</span>
                            {isEditing ? (
                                <input
                                    name="meterId"
                                    value={formData.meterId}
                                    onChange={handleChange}
                                    className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm text-right w-32 outline-none font-mono"
                                />
                            ) : (
                                <span className="text-white font-mono text-sm tracking-wide">{user?.meterId || 'Not Linked'}</span>
                            )}
                        </div>
                        <div className="h-px bg-white/5"></div>

                        {/* IoT Key */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">IoT Device Key</span>
                            {isEditing ? (
                                <input
                                    name="iotKey"
                                    type="password"
                                    value={formData.iotKey}
                                    onChange={handleChange}
                                    placeholder="Secret Key"
                                    className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm text-right w-32 outline-none font-mono"
                                />
                            ) : (
                                <span className="text-white font-mono text-sm tracking-wide flex items-center gap-2">
                                    <span className="text-neon-purple">●●●●</span>
                                    {user?.iotKey ? user.iotKey.slice(-4) : 'None'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 relative z-10">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex-1 py-3 bg-neon-blue hover:bg-cyan-400 text-black font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors border border-white/10"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={onLogout}
                                className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl transition-colors border border-red-500/20"
                            >
                                Sign Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
