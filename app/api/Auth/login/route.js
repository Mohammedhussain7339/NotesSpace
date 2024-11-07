import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/model/userinfo';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    console.log(req.email)
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email,name:user.name },
      process.env.NEXT_PUBLIC_JWT_SECRET||'your_jwt_secret_key',
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token,name: user.name,userId:user._id }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error); // Log the error
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
