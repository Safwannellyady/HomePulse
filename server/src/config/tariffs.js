export const TARIFFS = {
    standard: {
        currency: 'INR',
        slots: [
            { name: 'Off-Peak', start: '22:00', end: '06:00', rate: 4.5 },
            { name: 'Normal', start: '06:00', end: '10:00', rate: 6.0 },
            { name: 'Peak', start: '10:00', end: '18:00', rate: 8.5 },
            { name: 'Normal', start: '18:00', end: '22:00', rate: 6.0 }
        ]
    }
};
