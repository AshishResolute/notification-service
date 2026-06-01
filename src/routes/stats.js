import express from 'express';
import { userLogs } from '../controllers/stats.contoller.js';

const router = express.Router();


router.get('/:user_id',userLogs)



export default router;
