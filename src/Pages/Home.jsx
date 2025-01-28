import React, { useState, useEffect } from "react";
import axios from "axios";
import BookTable from "../Components/BookTable";
import EditBook from "../Components/EditBook";
import AddBook from "../Components/AddBook";
import DeleteBook from "../Components/DeleteBook";
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";

const Home = ({ books, setBooks, loading }) => {
  const [editModal, setEditModal] = useState(false);
  const [AddModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectBook, setSelectBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState(books); 

  useEffect(() => {
    setAllBooks(books); 
  }, [books]);

  const fetchCurrentBookDetail = async (book) => {
    setSelectBook();
    try {
      const response = await axios.get(
        `https://api.itbook.store/1.0/books/${book?.isbn13}`
      );
      console.log(response, "response");
      setSelectBook(response?.data);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleUpdate = (updatedData) => {
    if (selectBook) {
      setBooks((prev) =>
        prev.map((book) =>
          book.isbn13 === selectBook.isbn13
            ? { ...updatedData, isbn13: book.isbn13 }
            : book
        )
      );
      setSelectBook(null);
      toast.success("Item Updated Successfully!");
    } else {
      const bookExists = books.some((book) => book.isbn13 === updatedData.isbn13);

      if (!bookExists) {
        setBooks((prev) => [...prev, updatedData]);
        toast.success("New Book Added Successfully!");
      } else {
        toast.error("This ISBN already exists in the collection!");
      }
    }
  };

  const confirmDelete = () => {
    setBooks((prev) =>
      prev.filter((book) => book.isbn13 !== selectBook.isbn13)
    );
    setSelectBook(null);
    setDeleteModal(false);
    toast.success("Item Removed Successfully!");
  };

  const handleEdit = async (book) => {
    await fetchCurrentBookDetail(book);
    setEditModal(true);
  };

  const handleDelete = (book) => {
    setSelectBook(book);
    setDeleteModal(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setAllBooks(books);
    } else {
      setAllBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row   md:justify-end gap-2 items-start md:items-center mb-8 space-y-4 md:space-y-0 ">
        <div className="relative w-full md:w-80"> 
    <input
      type="text"
      placeholder="Search books..."
      value={searchQuery}
      onChange={(e) => handleSearch(e)}
      className="pl-10 pr-4 py-2 border border-gray-200 outline-none rounded-lg w-full"  
    />
    <CiSearch className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
  </div>

          <div className=" flex flex-col md:mt-0  md:w-auto w-full ">
            <button
              onClick={() => {
                setAddModal(true);
              }}
              className="flex items-center justify-center space-x-2 px-6 py-2 bg-orange-400 text-white rounded-lg cursor-pointer "
            >
              <CiCirclePlus size={22} />
              <span>Add Book</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <BookTable
                books={allBooks}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
              />
            </div>
          </div>
        </div>

        {selectBook && (
          <>
            <DeleteBook
              open={deleteModal}
              handleClose={() => {
                setDeleteModal(false);
                setSelectBook(null);
              }}
              onDelete={confirmDelete}
              bookTitle={selectBook?.title}
            />
            <EditBook
              open={editModal}
              handleClose={() => {
                setEditModal(false);
                setSelectBook(null);
              }}
              initialData={selectBook}
              onSubmit={handleUpdate}
            />
          </>
        )}

        <AddBook
          open={AddModal}
          handleClose={() => {
            setAddModal(false);
            setSelectBook(null);
          }}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Home;
