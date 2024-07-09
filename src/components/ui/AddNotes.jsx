"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
export default function AddNotes({ onAdd }) {
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    title: "",
    note: "",
  });

  const dialog = useRef();
  const [showTextArea, setShowTextArea] = useState(false);
  function handleOpenTextArea() {
    dialog.current.showModal();
    setShowTextArea(true);
  }
  function handleCloseTextArea() {
    setShowTextArea(false);
    setTimeout(() => {
      dialog.current.close();
    }, 500);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSave() {
    const newNote = { ...formData };
    try {
      const response = await fetch("/api/save-note", {
        method: "POST",
        body: JSON.stringify({ content: newNote, email: session.user.email }),
      });

      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      alert("Error uploading file: " + error.message);
    }
    onAdd();
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={handleOpenTextArea}
        className={`fixed shadow-lg outline-none transition-transform duration-500 ease-in-out transform hover:scale-125 cursor-pointer bottom-10 right-10  bg-yellow-400 text-white text-3xl rounded-full px-6 py-4
        `}
      >
        +
      </button>

      <dialog
        ref={dialog}
        className={`bg-white fixed p-4 h-[40%] w-[50%] rounded-lg transition-transform duration-300 ease-in-out transform ${
          showTextArea ? "scale-100" : "scale-0"
        }`}
      >
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 mb-4 p-2 bg-yellow-400 text-white font-medium text-xl rounded-lg"
          >
            <FaSave />
            Save
          </button>
          <button
            onClick={handleCloseTextArea}
            className="flex items-center gap-2 mb-4 p-2 bg-orange-400 text-white font-medium text-xl rounded-lg"
          >
            <FaWindowClose />
            Close
          </button>
        </div>
        <input
          type="text"
          onChange={handleInputChange}
          value={formData.title}
          name="title"
          className="text-black w-full outline-none p-4 font-bold font-sans text-xl"
          placeholder="Title"
        />
        <textarea
          className="w-full h-full p-4 z-10 rounded-lg focus:outline-none text-lg"
          onChange={handleInputChange}
          value={formData.note}
          name="note"
          placeholder="Start Typing..."
        />
      </dialog>
      {/* <div
        class={`backdrop fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm ${
          dialog.current.open ? "visible" : "hidden"
        }`}
      ></div> */}
    </div>
  );
}
