import express from 'express';
import { getAppliances, toggleAppliance } from '../controllers/applianceController.js';

const router = express.Router();

router.get('/', getAppliances);
router.post('/:id/toggle', toggleAppliance);

export default router;
