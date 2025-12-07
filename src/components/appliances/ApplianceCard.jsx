import React, { useState } from 'react';
import { Power, Clock, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ScheduleModal from './ScheduleModal';

const ApplianceCard = ({ appliance, onToggle }) => {
    const [isOn, setIsOn] = useState(appliance.isOn);
    const [showSchedule, setShowSchedule] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
        onToggle && onToggle(appliance.id, !isOn);
    };

    return (
        <>
            <div className={twMerge(
                "rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden group hover:scale-[1.02]",
                isOn
                    ? "bg-neon-blue/10 border-neon-blue/50 shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                    : "bg-glass-surface border-white/10 hover:border-white/20"
            )}>
                {/* Status Indicator */}
                <div className={twMerge(
                    "absolute top-4 right-4 w-3 h-3 rounded-full transition-colors",
                    isOn ? "bg-neon-blue shadow-[0_0_8px_#00f3ff]" : "bg-gray-600"
                )}></div>

                <div className="flex items-start justify-between mb-6">
                    <div className={twMerge(
                        "p-3 rounded-xl transition-colors",
                        isOn ? "bg-neon-blue text-black" : "bg-white/5 text-gray-400"
                    )}>
                        {appliance.icon}
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">{appliance.name}</h3>
                <p className="text-sm text-gray-400 mb-6">{appliance.location}</p>

                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                        <p className="mb-0.5">Consumption</p>
                        <p className="text-white font-medium">{isOn ? appliance.consumption : '0'} kWh</p>
                    </div>

                    <button
                        onClick={handleToggle}
                        className={twMerge(
                            "p-3 rounded-full transition-all duration-300 active:scale-95",
                            isOn
                                ? "bg-neon-blue text-black shadow-[0_0_15px_#00f3ff]"
                                : "bg-white/10 text-white hover:bg-white/20"
                        )}
                    >
                        <Power className="w-5 h-5" />
                    </button>
                </div>

                {/* Additional Info overlay on hover if needed, or footer */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                        onClick={() => setShowSchedule(true)}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                        <Clock className="w-3.5 h-3.5" />
                        Schedule
                    </button>
                </div>
            </div>

            <ScheduleModal
                isOpen={showSchedule}
                onClose={() => setShowSchedule(false)}
                applianceName={appliance.name}
            />
        </>
    );
};

export default ApplianceCard;
