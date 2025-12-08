import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { AlertCircle, TrendingDown, Clock } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const tariffData = [
    { hour: '00', rate: 4.5, type: 'Off-Peak' },
    { hour: '04', rate: 4.5, type: 'Off-Peak' },
    { hour: '06', rate: 6.0, type: 'Normal' },
    { hour: '09', rate: 8.5, type: 'Peak' }, // Morning Peak
    { hour: '12', rate: 6.0, type: 'Normal' },
    { hour: '17', rate: 8.5, type: 'Peak' }, // Evening Peak
    { hour: '22', rate: 4.5, type: 'Off-Peak' },
    { hour: '24', rate: 4.5, type: 'Off-Peak' },
];

import { useAppliances } from '../context/ApplianceContext';
import { useToast } from '../context/ToastContext';

// ... (tariffData remains same) ...

const dataTips = [
    { id: 'wash', title: 'Shift Washing Machine', savings: '₹120/mo', desc: 'Running it at 10 PM instead of 7 PM saves 40% on tariff.', urgent: true, type: 'Washing Machine' },
    { id: 'geyser', title: 'Geyser Optimization', savings: '₹85/mo', desc: 'Auto-schedule geyser to turn off at 9 AM (Peak start).', urgent: false, type: 'Geyser' },
    { id: 'ac', title: 'AC Temperature', savings: '₹300/mo', desc: 'Setting AC to 24°C instead of 20°C reduces load by 15%.', urgent: false, type: 'AC' },
];

const ToDOptimizer = () => {
    const { virtualTime } = useSimulation();
    const { appliances } = useAppliances();
    const { showToast } = useToast();
    const [optimizedIds, setOptimizedIds] = React.useState([]);

    const handleAutomate = (tip) => {
        if (optimizedIds.includes(tip.id)) return;

        // Check if appliance exists
        const exists = appliances.some(a => a.type === tip.type || a.name.includes(tip.type));

        if (exists || tip.type === 'Washing Machine') { // Allow washing machine simulation even if not in list
            setOptimizedIds(prev => [...prev, tip.id]);
            showToast(`${tip.title} applied! Savings started.`, "success");
        } else {
            showToast(`No ${tip.type} found to automate.`, "error");
        }
    };

    return (
        <div className="animate-fade-in-up space-y-8">
            {/* ... Header and Chart remain same ... */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Time-of-Day Optimization</h2>
                <p className="text-gray-400">Shift your usage to off-peak hours and save up to 15% on bills.</p>
            </div>

            {/* Tariff Chart */}
            <div className="bg-glass-surface rounded-2xl p-4 md:p-6 border border-white/10">
                {/* ... Chart Content (Keep exactly as before) ... */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Tariff Rates (₹/kWh)</h3>
                    <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span>Off-Peak (₹4.5)</div>
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span>Normal (₹6.0)</div>
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span>Peak (₹8.5)</div>
                    </div>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={tariffData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#bc13fe" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#bc13fe" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="hour" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                            <Area type="stepAfter" dataKey="rate" stroke="#bc13fe" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                            {/* Current Time Indicator */}
                            <ReferenceArea x1={virtualTime.getHours().toString().padStart(2, '0')} x2={virtualTime.getHours().toString().padStart(2, '0')} stroke="red" strokeOpacity={0.5} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="mt-2 text-center text-sm text-gray-400">
                        Current Virtual Time: <span className="text-white font-bold">{virtualTime.getHours()}:00</span>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataTips.map((tip, index) => {
                    const isOptimized = optimizedIds.includes(tip.id);
                    return (
                        <div key={index} className={`bg-glass-surface rounded-2xl p-4 md:p-6 border ${isOptimized ? 'border-green-500/50' : 'border-white/10'} hover:border-neon-blue/30 transition-all group relative overflow-hidden`}>
                            {isOptimized && <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />}

                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${tip.urgent && !isOptimized ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                    {tip.urgent && !isOptimized ? <AlertCircle className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                                </div>
                                <span className="text-sm font-bold text-neon-blue bg-neon-blue/10 px-2 py-1 rounded-lg">
                                    Save {tip.savings}
                                </span>
                            </div>

                            <h4 className="text-lg font-bold text-white mb-2">{tip.title}</h4>
                            <p className="text-sm text-gray-400 mb-6">{tip.desc}</p>

                            <button
                                onClick={() => handleAutomate(tip)}
                                disabled={isOptimized}
                                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${isOptimized ? 'bg-green-500 text-black cursor-default' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                            >
                                <Clock className="w-4 h-4" />
                                {isOptimized ? 'Optimized' : 'Automate This'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ToDOptimizer;
