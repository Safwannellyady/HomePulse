import React, { useState, useEffect } from 'react';
import { Zap, Activity } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { useAppliances } from '../../context/ApplianceContext';
import RealtimeGauge from './RealtimeGauge';

const LiveMonitor = () => {
    const { loadOffset } = useSimulation();
    const { appliances } = useAppliances();

    // Calculate load from active appliances
    const activeApplianceLoad = appliances
        .filter(app => app.isOn)
        .reduce((sum, app) => sum + (app.consumption || 0), 0);

    const [metrics, setMetrics] = useState({
        voltage: 230,
        current: 4.5,
        power: 1.03,
        pf: 0.92,
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            // In a real app, we might merge activeApplianceLoad here if the backend doesn't know about it.
            // But for this sim, let's assume the backend simulator handles the "total" load.
            try {
                const res = await fetch('/api/meter/current');
                const data = await res.json();

                if (res.ok) {
                    setMetrics({
                        voltage: data.voltage,
                        current: data.current,
                        power: data.power,
                        pf: 0.95 // Mock PF as simulator doesn't send it yet
                    });
                }
            } catch (err) {
                console.error("Failed to fetch meter data", err);
            }
        };

        // Initial fetch
        fetchMetrics();
        const interval = setInterval(fetchMetrics, 2000);

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
                <RealtimeGauge value={metrics.power} max={10} unit="kW" />
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
