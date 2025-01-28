import React from "react";
import Modal from "@mui/material/Modal";
import BookForm from "./BookForm";
import { IoClose } from "react-icons/io5";

const EditBook = ({ open, handleClose, onSubmit, initialData }) => {
  const handleSubmit = (data) => {
    console.log(data,'hello')
    onSubmit(data);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] max-h-[800px] h-[90%] bg-white border-0 rounded-xl flex flex-col">
        <div className="sticky top-0 z-50 bg-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
          <span className="font-medium  text-xl not-only:">Edit Book</span>
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            <IoClose size={22} />
          </span>
        </div>
        <div className="overflow-y-auto pt-10 pb-4">
          <BookForm onSave={handleSubmit} initialData={initialData} onClose={handleClose} />
        </div>
      </div>
    </Modal>
  );
};

export default EditBook;
