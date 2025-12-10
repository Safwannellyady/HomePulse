import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

const CostEstimator = () => {
    const { virtualTime } = useSimulation();
    const [cost, setCost] = useState({
        hourly: 8.5,
        daily: 145.20,
        projected: 4500
    });

    useEffect(() => {
        const fetchStats = async () => {
            const hour = virtualTime.getHours();
            let baseRate = 8.5;

            if (hour >= 18 && hour <= 22) baseRate = 12.0;
            else if (hour >= 22 || hour <= 6) baseRate = 6.0;

            try {
                const res = await fetch('/api/meter/current');
                const data = await res.json();
                if (data.daily) {
                    setCost({
                        hourly: baseRate.toFixed(2),
                        daily: data.daily.cost.toFixed(2),
                        projected: (data.daily.cost * 30).toFixed(0) // Simple projection
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };

        const interval = setInterval(fetchStats, 2000);
        return () => clearInterval(interval);
    }, [virtualTime]);

    return (
        <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-neon-purple/20 rounded-lg">
                    <IndianRupee className="w-5 h-5 text-neon-purple" />
                </div>
                <h3 className="text-lg font-semibold text-white">Cost Est.</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-sm text-gray-400">Hourly Rate</p>
                        <p className="text-2xl font-bold text-white flex items-center gap-0.5">
                            <span className="text-lg">₹</span>{cost.hourly}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-neon-purple bg-neon-purple/10 px-2 py-1 rounded">+1.2%</p>
                        <p className="text-[10px] text-gray-500 mt-1">vs avg</p>
                    </div>
                </div>

                <div className="h-px bg-white/5"></div>

                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-sm text-gray-400">Today</p>
                        <p className="text-xl font-bold text-white flex items-center gap-0.5">
                            <span className="text-base">₹</span>{cost.daily}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 text-right">Proj. Month</p>
                        <p className="text-xl font-bold text-white flex items-center justify-end gap-0.5">
                            <span className="text-base">₹</span>{cost.projected}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostEstimator;
