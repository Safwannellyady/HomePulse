import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-20 bg-black/20 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-6 flex items-center justify-between">
            {/* Title / Breadcrumb */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, Safwan</p>
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
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-neon-purple rounded-full shadow-[0_0_8px_#bc13fe]"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-white">Safwan</p>
                        <p className="text-xs text-neon-blue">Premium User</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border border-white/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-300" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
