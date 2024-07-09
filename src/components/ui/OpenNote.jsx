"use client";
import {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FaWindowClose } from "react-icons/fa";
const OpenNote = forwardRef(function Modal({ note, id, onClose }, ref) {
  const dialog = useRef();

  const [selectedNote, setSelectedNote] = useState(note);

  function handleDialogClose() {
    onClose();
  }
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });
  return (
    <dialog
      className="p-4 outline-none rounded-lg w-[80%] h-[40%] md:w-[40%]"
      ref={dialog}
    >
      {id && (
        <>
          <button
            onClick={handleDialogClose}
            className="text-2xl outline-none w-[2rem]"
          >
            <FaWindowClose />
          </button>
          <h1 className="mb-2 text-center font-bold text-2xl">{id}</h1>
          <h1 className="mb-2 text-center font-bold text-2xl">{note.title}</h1>
          <p>{note.notes}</p>
        </>
      )}
    </dialog>
  );
});
export default OpenNote;
