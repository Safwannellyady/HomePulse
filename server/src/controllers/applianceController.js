import { iotSimulator } from '../utils/iotSimulator.js';

export const getAppliances = (req, res) => {
    res.json(iotSimulator.getAppliances());
};

export const toggleAppliance = (req, res) => {
    const { id } = req.params;
    const updatedAppliance = iotSimulator.toggleAppliance(id);

    if (updatedAppliance) {
        res.json({ success: true, appliance: updatedAppliance });
    } else {
        res.status(404).json({ success: false, message: 'Appliance not found' });
    }
};
