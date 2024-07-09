"use client";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FaSave, FaWindowClose } from "react-icons/fa";
const EditNote = forwardRef(function Modal({ note, id, onClose, onEdit }, ref) {
  const EditDialog = useRef();
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    note: note.notes,
  });

  async function handleSaveEdit(id) {
    onClose();
    onEdit();
    const updatedNote = {
      title: editedNote.title,
      note: editedNote.note,
      id: id,
    };

    try {
      const response = await fetch("/api/edit-note", {
        method: "POST",
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        alert("Note edited successfully!");
      } else {
        alert("Note edit failed");
      }
    } catch (error) {
      alert("Error editing file.: " + error.message);
    }
  }
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        EditDialog.current.showModal();
      },
      close: () => {
        EditDialog.current.close();
      },
    };
  });

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setEditedNote({
      ...editedNote,
      [name]: value,
    });
  };

  return (
    <dialog ref={EditDialog} className="h-[40%] w-[40%] p-4">
      <div className="flex justify-between">
        <button onClick={onClose} className="flex outline-none w-[2rem]">
          <p className="flex items-center gap-2 bg-yellow-300 p-1 rounded-e-lg">
            <FaWindowClose /> Close
          </p>
        </button>
        <button
          onClick={() => handleSaveEdit(id)}
          className="flex outline-none"
        >
          <p className="flex items-center gap-2 bg-yellow-300 p-1 rounded-e-lg">
            <FaSave /> Save
          </p>
        </button>
      </div>
      <div className="flex flex-col h-full">
        <input
          className="text-center font-bold text-2xl outline-none"
          value={editedNote.title}
          name="title"
          onChange={handleInputUpdate}
        />
        <textarea
          className="h-full outline-none"
          value={editedNote.note}
          name="note"
          onChange={handleInputUpdate}
        />
      </div>
    </dialog>
  );
});

export default EditNote;
