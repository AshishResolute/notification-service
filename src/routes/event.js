import express from 'express';
import { event } from '../controllers/event.contoller.js';
const router = express.Router();

router.get('/:event_type/:user_id',event)

export default router