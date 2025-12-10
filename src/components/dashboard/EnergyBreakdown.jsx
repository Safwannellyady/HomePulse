import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAppliances } from '../../context/ApplianceContext';

const EnergyBreakdown = () => {
    const { appliances } = useAppliances();

    // Group by type and sum consumption
    const groupedData = appliances.reduce((acc, app) => {
        const type = app.type;
        // Use power (Watts) and convert to kW for display, or just relative value
        // Backend provides 'power' (Watts), initial state had 'consumption' (kW)
        const val = app.power ? app.power / 1000 : (app.consumption || 0);
        acc[type] = (acc[type] || 0) + val;
        return acc;
    }, {});

    // Ensure we have some data even if no appliances
    if (Object.keys(groupedData).length === 0) {
        groupedData['Others'] = 0.5;
    }

    const data = Object.keys(groupedData).map(key => ({
        name: key,
        value: groupedData[key]
    }));

    const COLORS = ['#00f3ff', '#bc13fe', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Energy Composition</h3>
            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">Breakdown based on connected appliances</p>
        </div>
    );
};

export default EnergyBreakdown;
