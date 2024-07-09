import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import OpenNote from "./OpenNote";
import EditNote from "../EditNote";
export default function AllNotes({ notes, onEdit, onDelete }) {
  const modal = useRef();
  const EditModal = useRef();
  const [id, setId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenNote, setIsOpenNote] = useState(false);
  const [localNotes, setLocalNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  function handleOpenNoteClick(noteId) {
    setId(noteId);
    const index = localNotes.findIndex(({ id }) => id === noteId);
    setCurrentNote(localNotes[index]);
    setIsOpenNote(true);
  }

  function handleEdit(noteId) {
    setId(noteId);
    const index = localNotes.findIndex(({ id }) => id === noteId);
    setCurrentNote(localNotes[index]);
    setIsEditing(true);
  }

  async function handleDelete(noteId) {
    setId(noteId);
    try {
      const response = await fetch("/api/delete-note", {
        method: "DELETE",
        body: JSON.stringify(noteId),
      });

      if (response.ok) {
        alert("Note deleted successfully.");
      } else {
        alert("Note couldn't be deleted.");
      }
    } catch (error) {
      alert("Error deleting note!!: " + error.message);
    }
    onDelete(noteId);
    onEdit();
  }

  const handleCloseModal = (setModalState, modalRef) => {
    setModalState(false);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleCloseEditing = () => {
    handleCloseModal(setIsEditing, EditModal);
    setCurrentNote(null);
  };

  const handleCloseOpenNote = () => {
    handleCloseModal(setIsOpenNote, modal);
    setCurrentNote(null);
  };

  useEffect(() => {
    if (isEditing && EditModal.current) {
      EditModal.current.open();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isOpenNote && modal.current) {
      modal.current.open();
    }
  }, [isOpenNote]);

  return (
    <>
      {isOpenNote && (
        <OpenNote
          ref={modal}
          note={currentNote}
          id={id}
          onClose={handleCloseOpenNote}
        />
      )}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {localNotes &&
          localNotes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-400 flex flex-col justify-between rounded-lg h-[10rem] md:h-[20rem] p-4 hover:rotate-6 transition-transform ease-in-out duration-300"
            >
              <div
                className="flex flex-col h-[8rem] md:h-[15rem]"
                onClick={() => handleOpenNoteClick(note.id)}
              >
                <h1 className="text-center font-bold text-xl">{note.title}</h1>
                <p className="overflow-hidden overflow-ellipsis">
                  {note.notes}
                </p>
              </div>
              <span className="text-black flex opacity-0 duration-300 ease-in-out w-full top-0 left-0 transition-opacity hover:opacity-100 justify-center items-end gap-4 text-xl">
                <FaEdit
                  className="cursor-pointer"
                  onClick={() => handleEdit(note.id)}
                />
                <RiDeleteBin6Line
                  className="cursor-pointer"
                  onClick={() => handleDelete(note.id)}
                />
              </span>
            </div>
          ))}
        {isEditing && (
          <EditNote
            ref={EditModal}
            onClose={handleCloseEditing}
            note={currentNote}
            onEdit={onEdit}
            id={id}
          />
        )}
      </div>
    </>
  );
}
