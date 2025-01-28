import React from "react";
import BookForm from "../Components/BookForm";
import toast from "react-hot-toast";

const AddBook = ({ books, setBooks, loading }) => {
  const handleUpdate = (updatedData) => {
    const bookExists = books.some((book) => book.isbn13 === updatedData.isbn13);

    if (!bookExists) {
      setBooks((prev) => [...prev, updatedData]);
      toast.success("New Book Added Successfully!");
    } else {
      toast.error("This ISBN already exists in the collection!");
    }
  };
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 ">
      <div className=" max-w-7xl m-4 p-4 bg-white border border-gray-200 rounded-md  mx-auto ">
        <BookForm books={books} onSave={handleUpdate} loading={loading} />
      </div>
    </div>
  );
};

export default AddBook;
