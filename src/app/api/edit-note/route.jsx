"use server";
import { editNote } from "@/src/data/notes";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    editNote(body);
    return NextResponse.json({ status: 200 }, { message: "Note Updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 500 },
      { message: "Notes wasn't updated due to some error" }
    );
  }
}
