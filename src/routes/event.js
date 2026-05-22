import express from 'express';
import { event } from '../controllers/event.contoller.js';
const router = express.Router();

router.post('/',event)

export default router