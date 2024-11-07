import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    userId: { // Reference to User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    text: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

// Use `mongoose.models` to avoid recompiling the model during hot reloads
const Notes = mongoose.models.Notes || mongoose.model('Notes', NotesSchema);

export default Notes;
