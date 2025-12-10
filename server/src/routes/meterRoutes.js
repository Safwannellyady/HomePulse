import express from 'express';
import { getCurrentReading, getHistory } from '../controllers/meterController.js';

const router = express.Router();

router.get('/current', getCurrentReading);
router.get('/history', getHistory);

export default router;
