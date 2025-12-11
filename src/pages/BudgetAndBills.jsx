import React, { useState } from 'react';
import { Wallet, Leaf, TrendingUp, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { useAuth } from '../context/AuthContext';

const BudgetAndBills = () => {
    const { user, updateBudget } = useAuth();
    const [budget, setBudget] = useState(user?.monthlyBudget || 1500);

    // Calculate actual spend from transaction history (Debits this month)
    const currentSpend = (user?.transactionHistory || [])
        .filter(t => t.type === 'Debit')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const projectedSpend = currentSpend * 1.1; // Simple projection

    const handleBudgetChange = (e) => {
        const val = Number(e.target.value);
        setBudget(val);
    };

    const saveBudget = () => {
        updateBudget(budget);
    };

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

                    <div className="mb-6">
                        <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2 font-medium">Monthly Limit (₹)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-light">₹</span>
                            <input
                                type="number"
                                value={budget}
                                onChange={handleBudgetChange}
                                onBlur={saveBudget}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-2xl font-bold text-white focus:border-neon-blue outline-none transition-all focus:bg-white/10"
                            />
                        </div>
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
            <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 min-h-[18rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:w-1/2 h-64 md:h-full">
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
                <div className="w-full md:w-1/2 md:pl-6 md:border-l border-white/5 space-y-6">
                    <div>
                        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                            Analysis
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-wider">Live</span>
                        </h4>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[0] }}></div>
                                    <span className="text-gray-300 text-sm">Spent</span>
                                </div>
                                <span className="text-white font-mono">₹{currentSpend.toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[1] }}></div>
                                    <span className="text-gray-300 text-sm">Remaining</span>
                                </div>
                                <span className="text-white font-mono">₹{(budget - currentSpend).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {projectedSpend > budget ? (
                        <div className="flex items-start gap-3 text-red-300 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-red-200">Budget Warning</p>
                                <p className="text-xs opacity-80 mt-1">Projected to exceed by ₹{(projectedSpend - budget).toFixed(0)} based on current trend.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 text-green-300 text-sm bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                            <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-green-200">On Track</p>
                                <p className="text-xs opacity-80 mt-1">You are well within your monthly budget limits.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BudgetAndBills;
