import React, { useState } from 'react';
import { Settings2, Clock, Zap, AlertTriangle, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

const DemoControls = () => {
    const {
        virtualTime,
        setHour,
        loadOffset,
        setLoadOffset,
        setForcedBudgetPercent,
        resetSimulation
    } = useSimulation();

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`fixed bottom-4 right-4 z-[100] transition-all duration-300 ${isExpanded ? 'w-80' : 'w-14'}`}>
            <div className="bg-black/80 backdrop-blur-md border border-neon-blue/30 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.15)] overflow-hidden">
                {/* Header / Toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-full p-4 flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} text-neon-blue hover:bg-white/5 transition-colors`}
                >
                    {isExpanded ? (
                        <>
                            <div className="flex items-center gap-2 font-bold">
                                <Settings2 className="w-5 h-5 animate-spin-slow" />
                                Demo Control Panel
                            </div>
                            <ChevronDown className="w-5 h-5" />
                        </>
                    ) : (
                        <Settings2 className="w-6 h-6 animate-pulse" />
                    )}
                </button>

                {/* Controls Body */}
                {isExpanded && (
                    <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {/* Time Travel */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <Clock className="w-4 h-4 text-purple-400" />
                                Virtual Hour ({virtualTime.getHours()}:00)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="23"
                                step="1"
                                value={virtualTime.getHours()}
                                onChange={(e) => setHour(parseInt(e.target.value))}
                                className="w-full accent-purple-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 px-1">
                                <span>12AM</span>
                                <span>12PM</span>
                                <span>11PM</span>
                            </div>
                        </div>

                        {/* Load Injection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                Inject Load (+{loadOffset} kW)
                            </label>
                            <div className="flex gap-2">
                                {[0, 2, 5, 10].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setLoadOffset(val)}
                                        className={`flex-1 py-1 rounded text-xs font-bold transition-all ${loadOffset === val
                                                ? 'bg-yellow-500 text-black shadow-lg'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {val === 0 ? 'Normal' : `+${val}kW`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Budget Trigger */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                Budget Trigger
                            </label>
                            <button
                                onClick={() => setForcedBudgetPercent(95)}
                                className="w-full py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all font-bold text-sm"
                            >
                                Simulate 95% Used
                            </button>
                        </div>

                        {/* Reset */}
                        <div className="pt-4 border-t border-white/10">
                            <button
                                onClick={resetSimulation}
                                className="w-full py-2 flex items-center justify-center gap-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all text-sm"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Reset Simulation
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoControls;
