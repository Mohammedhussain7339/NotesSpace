import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,  },
    password: { type: String, required: true },
    // Add other fields as needed
});

// Export the model
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
