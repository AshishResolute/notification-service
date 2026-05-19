import express from 'express'
import dotenv from 'dotenv';
import path from 'path'
dotenv.config({path:path.join(import.meta.dirname,'../../.env')});


const app = express();
const PORT = process.env.SERVER_PORT

export  {app,PORT};