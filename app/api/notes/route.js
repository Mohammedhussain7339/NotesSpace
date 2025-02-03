import dbConnect from "../../lib/dbConnect.js";
import Notes from "../../lib/model/notes";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect(); // Connect to the database
  console.log(dbConnect)
  const { userId, text, date, color } = await req.json(); // Pass `userId` from frontend
  console.log("userId",userId,"text",text,"date",date,"color",color)
  if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
      const newNote = await Notes.create({
          id: Date.now(),
          userId,
          text,
          date,
          color,
      });

      return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


export async function GET(request) {
  // Connect to the database
  await dbConnect();

  // Access the query parameter from the request URL
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  
  console.log("userId", userId);

  // If userId is missing, return an error response
  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch all notes from the database based on userId
    const notes = await Notes.find({ userId });

    // Respond with the fetched notes
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    // Handle any errors
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
  }
}
  
export async function DELETE(req) {
  await dbConnect(); // Connect to the database
  console.log(dbConnect)
  try {
    const { id } = req.json(); // Get the note ID from the request body
    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }

    // Find and delete the note by ID
    const deletedNote = await Notes.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Return a success message if the note was deleted
    return NextResponse.json({ message: "Note deleted successfully", deletedNote }, { status: 200 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json({ error: "Error deleting note" }, { status: 500 });
  }
}
