import React from "react";
import Modal from "@mui/material/Modal";
import { IoClose,IoAlertCircle } from "react-icons/io5";



const DeleteBook = ({ open, handleClose, onDelete, bookTitle }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px]  bg-white border-0 rounded-xl flex flex-col">
      <div className="sticky top-0 z-50 bg-gray-200 p-4 flex justify-end  rounded-t-2xl">
         
          <span onClick={handleClose} style={{ cursor: 'pointer' }}><IoClose size={22}/></span>
        </div>
      
        
        <div className="space-y-4 p-4">
          <div className="flex items-center space-x-1 text-orange-400">
            <IoAlertCircle size={28} />
            <p className="text-lg font-medium">Are you sure?</p>
          </div>

          <p className="text-gray-600">
            You are about to delete "
            <span className="font-medium text-gray-900">{bookTitle}</span>".
            This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100  cursor-pointer rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 text-white bg-orange-400 cursor-pointer rounded-lg "
            >
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBook;
