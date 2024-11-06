  import dbConnect from "../../lib/dbConnect";
  import Notes from "../../lib/model/notes";
  import { NextResponse } from "next/server";

  export async function POST(req) {
    await dbConnect(); // Connect to the database
    console.log(dbConnect)
    try {
        const { id, text, date, color } = await req.json();
        console.log('id:',id,'text:',text,'date',date,'color',color)
        const newNote = await Notes.create({ id, text, date, color });
        return new Response(JSON.stringify(newNote), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  export async function GET(req) {
    // Connect to the database
    await dbConnect();
  
    try {
      // Fetch all notes from the database
      const notes = await Notes.find();
  
      // Respond with the fetched notes
      return NextResponse.json(notes, { status: 200 });
    } catch (error) {
      // Handle any errors
      console.error("Error fetching notes:", error);
      return NextResponse.json({ error: "Error fetching notes" }, { status: 500 });
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
  