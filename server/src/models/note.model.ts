import mongoose from 'mongoose';

interface INote {
	title: string;
	content: string;
}

const NoteSchema = new mongoose.Schema<INote>({
	title: String,
	content: String,
}, {
	timestamps: true,
});

export default mongoose.model<INote>('Note', NoteSchema);