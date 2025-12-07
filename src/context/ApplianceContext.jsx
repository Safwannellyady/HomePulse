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

const initialAppliances = [
    { id: 1, name: 'Air Conditioner', location: 'Living Room', type: 'AC', consumption: 1.5, isOn: true },
    { id: 2, name: 'Smart TV', location: 'Bedroom', type: 'TV', consumption: 0.2, isOn: false },
    { id: 3, name: 'Geyser', location: 'Bathroom 1', type: 'Geyser', consumption: 2.0, isOn: false },
    { id: 4, name: 'Refrigerator', location: 'Kitchen', type: 'Fridge', consumption: 0.15, isOn: true },
];

export const ApplianceProvider = ({ children }) => {
    const [appliances, setAppliances] = useState(() => {
        const saved = localStorage.getItem('homepulse_appliances');
        return saved ? JSON.parse(saved) : initialAppliances;
    });

    useEffect(() => {
        localStorage.setItem('homepulse_appliances', JSON.stringify(appliances));
    }, [appliances]);

    const addAppliance = (newAppliance) => {
        const item = { ...newAppliance, id: Date.now(), isOn: false };
        setAppliances([...appliances, item]);
    };

    const removeAppliance = (id) => {
        setAppliances(appliances.filter(a => a.id !== id));
    };

    const toggleAppliance = (id, state) => {
        setAppliances(appliances.map(a => a.id === id ? { ...a, isOn: state } : a));
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
