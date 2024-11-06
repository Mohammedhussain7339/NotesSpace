import dbConnect from "../../../lib/dbConnect";
import Notes from "../../../lib/model/notes";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await dbConnect();
  // Ensure the 'id' param exists
  const noteId = params.id;
  console.log("notesId:", noteId); // Check if this logs correctly

  if (!noteId) {
    return NextResponse.json({ message: "No ID provided" }, { status: 400 });
  }

  try {
    await dbConnect();

    // Use your custom `id` field to find and delete the note
    const deletedNote = await Notes.deleteOne({ id: noteId });

    if (deletedNote.deletedCount === 0) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully", deletedNote }, { status: 200 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json({ error: "Error deleting note" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const noteId = params.id;
  console.log("noteId:", noteId); // Check if this logs correctly

  if (!noteId) {
    return NextResponse.json({ message: "No ID provided" }, { status: 400 });
  }

  try {
    const { text, color, date } = await req.json(); // Assuming the updated fields are in the request body

    // Use the custom `id` field to find and update the note
    const updatedNote = await Notes.findOneAndUpdate(
      { id: noteId },
      { text, color, date },
      { new: true } // `new: true` returns the updated document
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note updated successfully", updatedNote }, { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json({ error: "Error updating note" }, { status: 500 });
  }
}
