import { iotSimulator } from '../utils/iotSimulator.js';

export const getCurrentReading = (req, res) => {
    const reading = iotSimulator.getLatest();
    res.json({
        ...reading,
        daily: iotSimulator.getDailyStats()
    });
};

export const getHistory = (req, res) => {
    // TODO: Add support for period filtering
    const { period } = req.query;
    const history = iotSimulator.getHistory();

    // Format for frontend
    res.json({
        period: period || 'live',
        data: history.map(h => ({
            time: new Date(h.timestamp).toLocaleTimeString(),
            value: h.power, // Charting power by default
            ...h
        }))
    });
};
