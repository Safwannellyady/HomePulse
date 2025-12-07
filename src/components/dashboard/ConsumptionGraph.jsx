import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

const data = [
    { time: '00:00', kwh: 0.4 },
    { time: '04:00', kwh: 0.3 },
    { time: '08:00', kwh: 1.2 },
    { time: '12:00', kwh: 2.5 }, // Peak
    { time: '16:00', kwh: 1.8 },
    { time: '20:00', kwh: 3.2 }, // Evening Peak
    { time: '23:59', kwh: 1.1 },
];

const ConsumptionGraph = () => {
    return (
        <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Usage Trends</h3>
                        <p className="text-xs text-gray-400">Today's Consumption (kWh)</p>
                    </div>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-white px-3 py-1 outline-none">
                    <option>Today</option>
                    <option>Week</option>
                    <option>Month</option>
                </select>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="kwh"
                            stroke="#00f3ff"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorKwh)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ConsumptionGraph;
