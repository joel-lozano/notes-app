import express, { Request, Response } from 'express';
import dbConfig from '../config/database.config';
import notesRouter from './routes/note.routes';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
	try {
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