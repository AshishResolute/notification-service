import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(import.meta.dirname,'../../.env')})

export const  SERVER_PORT = process.env.SERVER_PORT||3000

export const DB_HOST = process.env.DB_HOST

export const DB_PASSWORD = process.env.DB_PASSWORD

export const DB_DATABASE = process.env.DB_DATABASE

export const DB_USER = process.env.DB_USER

export const DB_PORT = process.env.DB_PORT

export const RESEND_API_KEY = process.env.RESEND_API_KEY;