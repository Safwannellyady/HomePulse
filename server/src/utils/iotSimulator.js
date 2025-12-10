import { TARIFFS } from '../config/tariffs.js';
import { APPLIANCES } from '../config/appliances.js';

let applianceState = APPLIANCES.map(app => ({ ...app, isOn: false }));

let dailyStats = {
    consumption: 0, // kWh
    cost: 0, // INR
    lastReset: new Date()
};

let latestReading = {
    voltage: 220,
    current: 0,
    power: 0,
    timestamp: new Date().toISOString()
};

let historyBuffer = [];

const SIMULATION_INTERVAL_MS = 2000; // 2 seconds

// Tariff Rates (Mock)
const RATES = {
    'Peak': 12.0,
    'Normal': 8.5,
    'Off-Peak': 6.0
};

const getTariffForTime = (date) => {
    const hour = date.getHours();
    // Simplified logic for demo
    if (hour >= 10 && hour < 18) return 'Peak';
    if (hour >= 22 || hour < 6) return 'Off-Peak';
    return 'Normal';
};

const getActiveApplianceLoad = () => {
    return applianceState
        .filter(app => app.isOn)
        .reduce((sum, app) => sum + app.power, 0) / 1000; // Convert to kW
};

const generateReading = () => {
    const now = new Date();

    // Base voltage fluctuation
    const voltage = 220 + (Math.random() * 6 - 3);

    // Simulate load based on time via tariff
    const tariffType = getTariffForTime(now);
    let baseCurrent = 2; // Minimum load

    if (tariffType === 'Peak') baseCurrent += Math.random() * 5;
    if (tariffType === 'Normal') baseCurrent += Math.random() * 2;

    // Add Appliance Load
    const applianceLoadKW = getActiveApplianceLoad();
    // I = P / V (approx)
    const applianceCurrent = (applianceLoadKW * 1000) / voltage;

    // Add noise
    const current = baseCurrent + applianceCurrent + (Math.random() * 0.5);
    const power = (voltage * current) / 1000; // kW

    // Accumulate Stats
    // Energy (kWh) = Power (kW) * Time (h)
    // Time = 2 seconds = 2/3600 hours
    const energy = power * (SIMULATION_INTERVAL_MS / 3600000);
    const rate = RATES[tariffType];
    const cost = energy * rate;

    // Reset daily stats if it's a new day (mock logic)
    if (now.getDate() !== dailyStats.lastReset.getDate()) {
        dailyStats = { consumption: 0, cost: 0, lastReset: now };
    }

    dailyStats.consumption += energy;
    dailyStats.cost += cost;

    const reading = {
        timestamp: now.toISOString(),
        voltage: parseFloat(voltage.toFixed(1)),
        current: parseFloat(current.toFixed(2)),
        power: parseFloat(power.toFixed(3)),
        tariff: tariffType
    };

    latestReading = reading;

    // Keep last 1 hour of data (approx 1800 points at 2s interval)
    if (historyBuffer.length > 1800) historyBuffer.shift();
    historyBuffer.push(reading);

    return reading;
};

// Start simulation loop
const startSimulation = () => {
    console.log('IoT Simulation Started...');
    setInterval(generateReading, SIMULATION_INTERVAL_MS);
};

export const iotSimulator = {
    start: startSimulation,
    getLatest: () => latestReading,
    getHistory: () => historyBuffer,
    getAppliances: () => applianceState,
    getDailyStats: () => dailyStats,
    toggleAppliance: (id) => {
        const app = applianceState.find(a => a.id === id);
        if (app) {
            app.isOn = !app.isOn;
            return app;
        }
        return null;
    }
};
