import dbConfig from './config/database.config';
import notes from './routes/note.routes';
import mongoose from 'mongoose';
import express, { Application } from 'express';

const PORT = 3000;

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async (): Promise<void> => {
	try {
		await mongoose.connect(dbConfig.url);
		console.log('Connected to database successfully.');
	} catch (err: any) {
		console.error(err.message || String(err) || "Error connecting to database. Exiting.");
		process.exit();
	}
})();

app.use('/notes', notes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
});