export const checkRules = (reading) => {
    const alerts = [];
    const recommendations = [];

    // Rule 1: High Power Alert
    if (reading.power > 5.0) {
        alerts.push({
            type: 'critical',
            message: `High Power Usage Detected: ${reading.power.toFixed(2)} kW`,
            timestamp: new Date().toISOString()
        });
    }

    // Rule 2: ToD Recommendation
    if (reading.tariff === 'Peak' && reading.power > 2.0) {
        recommendations.push({
            action: 'Shift Load',
            message: 'You are using high power during Peak hours. Consider shifting AC/Washing Machine to Off-Peak (after 10 PM) to save ~20%.',
            impact: 'High Savings'
        });
    }

    return { alerts, recommendations };
};
