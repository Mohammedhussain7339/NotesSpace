// // app/api/auth/signup/route.js
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import  User  from '../../../lib/model/userinfo';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await dbConnect();
        console.log('Connected to database');

        const { name, email, password } = await request.json();
        console.log('Received data:', { name, email, password });

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user
        await user.save();
        console.log('User registered successfully');
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error in signup route:', error);

        // Respond with validation error message
        if (error.name === 'ValidationError') {
            return NextResponse.json({ message: 'User validation failed', details: error.errors }, { status: 400 });
        }

        return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
}


