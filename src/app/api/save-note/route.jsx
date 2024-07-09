"use server";
import { saveNote } from "@/src/data/notes";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const email = body.email;
    saveNote(body.content, email);
    return NextResponse.json({ status: 200 }, { message: "Note Saved" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 500 },
      { message: "Notes wasn't saved due to some error" }
    );
  }
}
