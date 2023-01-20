import dbConfig from '../config/database.config';
import notesRouter from './routes/note.routes';
import mongoose from 'mongoose';
import express from 'express';
// import { Deta } from 'deta';

const PORT = 3000;

// const deta = Deta('b038srct_8bdjae5VHZ6MUZxHYyuTYkVJt6ZGhP2P');
// const db = deta.Base('notesDB');

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