import React from 'react';
import { Zap } from 'lucide-react';

const Logo = ({ className = "w-10 h-10", iconSize = "w-6 h-6", showText = true }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`${className} bg-gradient-to-br from-neon-blue to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.3)] border border-white/10 relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Zap className={`text-white ${iconSize} fill-current relative z-10`} />
            </div>
            {showText && (
                <span className="hidden lg:block font-bold text-xl text-white tracking-wide">
                    Home<span className="text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">Pulse</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
