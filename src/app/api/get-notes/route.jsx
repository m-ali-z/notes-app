"use server";
import { getNotes } from "@/src/data/notes";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const notes = await getNotes(body);
    console.log(notes);
    return NextResponse.json({ message: "OK", notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 500 },
      { message: "Notes wasn't saved due to some error" }
    );
  }
}
