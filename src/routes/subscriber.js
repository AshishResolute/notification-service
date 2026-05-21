import express from 'express';
import { subscribe } from '../controllers/subscibe.controller.js';
const router = express.Router();

router.post('/',subscribe)



export default router
