import { Queue } from "bullmq";
import redis from "./redis.js";


export const emailQueue = new Queue("emailQueue", { connection: redis });
export const phoneQueue = new Queue("phoneQueue", { connection: redis });
export const webhookQueue = new Queue("webhookQueue", { connection: redis });
