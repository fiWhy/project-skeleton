import { config } from 'dotenv';
import sendmail from 'sendmail';

config();

export * from './utils.js';
export * from './gmail.js';
