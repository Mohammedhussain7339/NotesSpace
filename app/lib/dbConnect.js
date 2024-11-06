// dbConnect.js
import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("Already connected to the database");
        return;
    }
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI); // <-- Add this line
// dbConnect.js
const db = await mongoose.connect("mongodb+srv://mohammed:mohammed@cluster0.jkkpaov.mongodb.net/NotesSpace");
        connection.isConnected = db.connection.readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

export default dbConnect;
