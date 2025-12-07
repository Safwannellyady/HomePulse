import React, { useState } from 'react';
import { Wallet, Leaf, TrendingUp, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const BudgetAndBills = () => {
    const [budget, setBudget] = useState(1500);
    const [currentSpend] = useState(1250);
    const projectedSpend = 1480;

    const percentage = Math.min((currentSpend / budget) * 100, 100);
    const co2 = (currentSpend * 0.82).toFixed(1); // Mock conversion factor

    const data = [
        { name: 'Spent', value: currentSpend },
        { name: 'Remaining', value: Math.max(0, budget - currentSpend) },
    ];

    const COLORS = ['#ef4444', '#22c55e'];
    if (percentage < 80) COLORS[0] = '#3bf6ff'; // Blue if safe

    return (
        <div className="animate-fade-in-up space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Budget & Sustainability</h2>
                <p className="text-gray-400">Track your expenses and environmental impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget Setting Card */}
                <div className="bg-glass-surface rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-neon-blue/20 rounded-lg">
                            <Wallet className="w-6 h-6 text-neon-blue" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Monthly Budget</h3>
                            <p className="text-xs text-gray-400">Set your limit</p>
                        </div>
                    </div>

                    <div className="mb-6 relative">
                        <label className="text-xs text-gray-500 uppercase tracking-widest absolute -top-2 left-3 bg-[#0a0a0a] px-1">Amount (₹)</label>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-2xl font-bold text-white focus:border-neon-blue outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Currently Spent</span>
                            <span className="text-white font-medium">₹{currentSpend}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${percentage > 90 ? 'bg-red-500' : 'bg-neon-blue'}`}
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span>{percentage.toFixed(0)}% Used</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>

                {/* Carbon Footprint Card */}
                <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Leaf className="w-32 h-32" />
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Leaf className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Carbon Footprint</h3>
                            <p className="text-xs text-gray-400">Environmental Impact</p>
                        </div>
                    </div>

                    <div className="text-center py-8">
                        <div className="text-5xl font-bold text-white mb-2">{co2} <span className="text-xl text-gray-500 font-normal">kg</span></div>
                        <p className="text-sm text-gray-400">CO₂ Emissions this month</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-green-500/20 p-2 rounded-full">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <p className="text-xs text-gray-300">
                            You've saved <span className="text-white font-bold">12 kg</span> CO₂ compared to last month! Keep it up.
                        </p>
                    </div>
                </div>
            </div>

            {/* Breakdown / Pie Chart (Optional/Extra) */}
            <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 h-72 flex items-center justify-between">
                <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: 'none', borderRadius: '8px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-1/2 pl-6 border-l border-white/5 space-y-4">
                    <h4 className="text-white font-medium mb-4">Budget Analysis</h4>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: COLORS[0] }}></div>
                        <span className="text-gray-400 text-sm">Spent (₹{currentSpend})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: COLORS[1] }}></div>
                        <span className="text-gray-400 text-sm">Remaining (₹{budget - currentSpend})</span>
                    </div>

                    {projectedSpend > budget && (
                        <div className="mt-4 flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-2 rounded-lg">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Projected to exceed budget by ₹{(projectedSpend - budget)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BudgetAndBills;
