import React, { createContext, useContext, useState, useEffect } from 'react';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
    // Virtual Time (start at real time, but can be shifted)
    const [virtualTime, setVirtualTime] = useState(new Date());
    const [isTimeFrozen, setIsTimeFrozen] = useState(false);

    // Load Injection (offset to add to real/random reading)
    const [loadOffset, setLoadOffset] = useState(0); // in kW

    // Budget override (null = real calc, number = forced % used)
    const [forcedBudgetPercent, setForcedBudgetPercent] = useState(null);

    // Update virtual time
    useEffect(() => {
        if (isTimeFrozen) return;
        const interval = setInterval(() => {
            setVirtualTime(prev => new Date(prev.getTime() + 1000)); // Tick 1:1 by default
        }, 1000);
        return () => clearInterval(interval);
    }, [isTimeFrozen]);

    const setHour = (hour) => {
        const newTime = new Date(virtualTime);
        newTime.setHours(hour, 0, 0, 0);
        setVirtualTime(newTime);
        setIsTimeFrozen(true); // Freeze to let them talk about it
    };

    const resetSimulation = () => {
        setVirtualTime(new Date());
        setIsTimeFrozen(false);
        setLoadOffset(0);
        setForcedBudgetPercent(null);
    };

    return (
        <SimulationContext.Provider value={{
            virtualTime,
            setHour,
            isTimeFrozen,
            setIsTimeFrozen,
            loadOffset,
            setLoadOffset,
            forcedBudgetPercent,
            setForcedBudgetPercent,
            resetSimulation
        }}>
            {children}
        </SimulationContext.Provider>
    );
};
