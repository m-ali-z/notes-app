"use server";
import { deleteNote, editNote } from "@/src/data/notes";
import { NextResponse } from "next/server";
export async function DELETE(req, res) {
  try {
    const body = await req.json();
    deleteNote(body);
    return NextResponse.json({ status: 200 }, { message: "Note Updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 500 },
      { message: "Notes wasn't updated due to some error" }
    );
  }
}
