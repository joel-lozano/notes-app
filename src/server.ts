import dbConfig from '../config/database.config';
import notesRouter from './routes/note.routes';
import mongoose from 'mongoose';
import express from 'express';
// import { Deta } from 'deta';

mongoose.set('strictQuery', false);

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
	try {
		if (!dbConfig.url) {
			throw new Error('No environment variable set for database url.')
		}

		await mongoose.connect(dbConfig.url);
		console.log('Connected to database successfully.');
	} catch (err: any) {
		console.error(err.message || "Error connecting to database.");
		process.exit();
	}
})();

app.use('/notes', notesRouter);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
});