import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tv, Wind, Thermometer, Box, Smartphone, Speaker } from 'lucide-react';

const ApplianceContext = createContext();

export const useAppliances = () => useContext(ApplianceContext);

// Helper to get icon component
const getIcon = (type) => {
    switch (type) {
        case 'AC': return <Wind className="w-6 h-6" />;
        case 'TV': return <Tv className="w-6 h-6" />;
        case 'Geyser': return <Thermometer className="w-6 h-6" />;
        case 'Fridge': return <Box className="w-6 h-6" />;
        case 'Speaker': return <Speaker className="w-6 h-6" />;
        default: return <Smartphone className="w-6 h-6" />;
    }
};

const normalizeAppliance = (appliance) => ({
    ...appliance,
    // Prefer explicit consumption in kWh, fallback to power (Watts) -> kW
    consumption: typeof appliance.consumption === 'number'
        ? appliance.consumption
        : appliance.power
            ? appliance.power / 1000
            : 0,
    isOn: Boolean(appliance.isOn)
});

export const ApplianceProvider = ({ children }) => {
    const [appliances, setAppliances] = useState([]);

    useEffect(() => {
        fetch('/api/appliances')
            .then(res => res.json())
            .then(data => setAppliances(data.map(normalizeAppliance)))
            .catch(err => console.error(err));
    }, []);

    const addAppliance = (newAppliance) => {
        // Mock add for now (backend didn't implement POST /appliances yet)
        const item = normalizeAppliance({ ...newAppliance, id: Date.now(), isOn: false });
        setAppliances(prev => [...prev, item]);
    };

    const removeAppliance = (id) => {
        setAppliances(prev => prev.filter(a => a.id !== id));
    };

    const toggleAppliance = async (id, state) => {
        // Optimistic update
        setAppliances(prev => prev.map(a => a.id === id ? { ...a, isOn: state } : a));

        try {
            await fetch(`/api/appliances/${id}/toggle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state })
            });
        } catch (err) {
            console.error("Failed to toggle appliance", err);
            // Revert on failure
            setAppliances(prev => prev.map(a => a.id === id ? { ...a, isOn: !state } : a));
        }
    };

    // Enrich stored data with icons (since React components don't store in JSON)
    const appliancesWithIcons = appliances.map(a => ({
        ...a,
        icon: getIcon(a.type)
    }));

    return (
        <ApplianceContext.Provider value={{ appliances: appliancesWithIcons, addAppliance, removeAppliance, toggleAppliance }}>
            {children}
        </ApplianceContext.Provider>
    );
};
