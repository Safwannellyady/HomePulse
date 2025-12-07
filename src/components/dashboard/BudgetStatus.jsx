import React from 'react';
import { Wallet, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { useAuth } from '../../context/AuthContext';

const BudgetStatus = () => {
    const { forcedBudgetPercent } = useSimulation();
    const { user } = useAuth();

    // Mock budget logic if user context is empty/loading
    const budget = user?.walletBalance ? user.walletBalance + 500 : 1500;
    const current = 1250;

    // Use forced % if simulation is active, otherwise real calc
    const percentage = forcedBudgetPercent !== null ? forcedBudgetPercent : (current / budget) * 100;
    const displayCurrent = forcedBudgetPercent !== null ? (budget * (forcedBudgetPercent / 100)) : current;

    const isWarning = percentage > 80;

    return (
        <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                    <Wallet className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Budget</h3>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-400">Remaining</p>
                        <p className="text-2xl font-bold text-white">₹{(budget - displayCurrent).toFixed(0)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Total Budget</p>
                        <p className="text-sm font-medium text-white">₹{budget}</p>
                    </div>
                </div>

                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-white/10">
                                {percentage.toFixed(0)}% Used
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                        <div
                            style={{ width: `${percentage}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isWarning ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'}`}
                        ></div>
                    </div>
                </div>

                {isWarning && (
                    <div className="flex items-center gap-2 text-red-300 text-xs bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Approaching limit! Check heavy appliances.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetStatus;
