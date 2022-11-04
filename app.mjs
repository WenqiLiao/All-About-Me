import express from 'express'
import './db.mjs';
import path from 'path'
import mongoose from 'mongoose'; 
import { fileURLToPath } from 'url';
import session from 'express-session';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(process.env.PORT || 3000);
