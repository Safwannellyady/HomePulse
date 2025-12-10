import express from 'express';
import { iotSimulator } from '../utils/iotSimulator.js';
import { checkRules } from '../utils/rulesEngine.js';

const router = express.Router();

router.get('/tod', (req, res) => {
    const latest = iotSimulator.getLatest();
    const { recommendations } = checkRules(latest);

    res.json({
        currentTariff: latest.tariff,
        recommendations
    });
});

export default router;
