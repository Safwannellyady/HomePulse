import React from 'react';
import { Home, Zap, Clock, Wallet, BarChart3, Settings, LogOut, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Logo from '../common/Logo';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const { showToast } = useToast();
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Zap, label: 'Appliances', path: '/appliances' },
        { icon: Clock, label: 'ToD Optimizer', path: '/tod-optimization' },
        { icon: Wallet, label: 'Wallet & Bills', path: '/wallet' },
        { icon: BarChart3, label: 'Budget & Eco', path: '/budget' },
        { icon: Star, label: 'Premium', path: '/subscription' },
    ];

    return (
        <div className="h-[100dvh] w-20 lg:w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col fixed left-0 top-0 transition-all duration-300 z-50">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/5">
                <Logo />
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center justify-center lg:justify-start w-full p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive(item.path)
                            ? 'bg-white/10 text-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.15)]'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {isActive(item.path) && (
                            <div className="absolute left-0 w-1 h-3/5 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]" />
                        )}
                        <item.icon className={`w-6 h-6 ${isActive(item.path) ? 'stroke-neon-blue' : ''}`} />
                        <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => showToast("Settings are locked in MVP mode.", "info")}
                    className="flex items-center justify-center lg:justify-start w-full p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                    <Settings className="w-6 h-6" />
                    <span className="hidden lg:block ml-4 font-medium">Settings</span>
                </button>
                <button
                    onClick={logout}
                    className="flex items-center justify-center lg:justify-start w-full p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all mt-2"
                >
                    <LogOut className="w-6 h-6" />
                    <span className="hidden lg:block ml-4 font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
