"use client";
import AddNotes from "@/src/components/ui/AddNotes";
import AllNotes from "@/src/components/ui/AllNotes";
import SearchBar from "@/src/components/ui/SearchBar";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import withSession from "./Hoc";
const LandingPage = () => {
  const [notes, setNotes] = useState([]);
  const { data: session, status } = useSession();
  const [email, setEmail] = useState();
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setEmail(session.user.email); // Pre-fill email if session is authenticated
      console.log(email);
      const fetchNotes = async () => {
        try {
          const response = await fetch("/api/get-notes", {
            method: "POST",
            body: JSON.stringify(email),
          });
          if (!response.ok) {
            throw new Error("failed to fetch");
          }
          const data = await response.json();
          setNotes(data.notes);
        } catch (error) {
          console.log(error);
        }
      };
      fetchNotes();
    }
  }, [status, session]);

  async function UpdatePage() {
    try {
      const response = await fetch("/api/get-notes", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const data = await response.json();
      setNotes([...data.notes]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(noteId) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }

  return (
    <div className="p-[3%] bg-slate-300">
      {session ? (
        <>
          <SearchBar />
          <AllNotes notes={notes} onEdit={UpdatePage} onDelete={handleDelete} />
          <AddNotes onAdd={UpdatePage} />
        </>
      ) : (
        <Link href="/">Click here to login first</Link>
      )}
    </div>
  );
};

export default withSession(LandingPage);
