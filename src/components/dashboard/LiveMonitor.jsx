import React, { useState, useEffect } from 'react';
import { Zap, Activity } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

const LiveMonitor = () => {
    const { loadOffset } = useSimulation();
    const [metrics, setMetrics] = useState({
        voltage: 230,
        current: 4.5,
        power: 1.03,
        pf: 0.92,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate small fluctuations
            const v = 228 + Math.random() * 5; // 228-233V

            // Base current calculation + Load Offset (converted to Amps roughly, assuming ~230V)
            // 1kW ~ 4.3A
            const offsetCurrent = (loadOffset * 1000) / 230;
            const c = 2 + Math.random() * 8 + offsetCurrent;

            const pf = 0.9 + Math.random() * 0.08;
            const p = (v * c * pf) / 1000; // kW

            setMetrics({
                voltage: v.toFixed(1),
                current: c.toFixed(2),
                power: p.toFixed(3),
                pf: pf.toFixed(2),
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-neon-blue" />
            </div>

            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-neon-blue/20 rounded-lg">
                    <Activity className="w-5 h-5 text-neon-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white">Live Monitor</h3>
                <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-0.5 rounded animate-pulse">
                    LIVE
                </span>
            </div>

            <div className="flex flex-col items-center justify-center mb-8">
                <div className="text-5xl font-bold text-white tracking-tighter tabular-nums text-shadow-neon-blue">
                    {metrics.power}
                    <span className="text-2xl text-gray-400 ml-2 font-medium">kW</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Current Load</p>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Voltage</p>
                    <p className="text-lg font-semibold text-white tabular-nums">{metrics.voltage} <span className="text-sm text-gray-500">V</span></p>
                </div>
                <div className="text-center border-l border-white/5">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current</p>
                    <p className="text-lg font-semibold text-white tabular-nums">{metrics.current} <span className="text-sm text-gray-500">A</span></p>
                </div>
                <div className="text-center border-l border-white/5">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">PF</p>
                    <p className="text-lg font-semibold text-white tabular-nums">{metrics.pf}</p>
                </div>
            </div>
        </div>
    );
};

export default LiveMonitor;
