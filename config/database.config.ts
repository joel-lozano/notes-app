import * as dotenv from 'dotenv';

dotenv.config();

export default {
	url: process.env.DATABASE_URL
}