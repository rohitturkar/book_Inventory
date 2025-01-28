import React, { useState, useEffect } from "react";
import axios from "axios";
import BookTable from "../Components/BookTable";
import EditBook from "../Components/EditBook";
import AddBook from "../Components/AddBook";
import DeleteBook from "../Components/DeleteBook";
import { IoLibrary } from "react-icons/io5";
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [AddModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectBook, setSelectBook] = useState(null);
  const [loading, setLoading] = useState(true);
 

  const fetchCurrentBookDetail = async (book) => {
    setSelectBook();
    try {
      const response = await axios.get(
        `https://api.itbook.store/1.0/books/${book?.isbn13}`
      );

      console.log(response, "response");

      setSelectBook(response?.data);
    } catch (error) {
      toast.error(error?.message)
    } 
  };

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://api.itbook.store/1.0/new", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBooks(response?.data?.books || []);
        toast.success("Item Fetched Successfully");
        setLoading(false);
      } catch (error) {
        setLoading(false);

        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
      const bookExists = books.some(
        (book) => book.isbn13 === updatedData.isbn13
      );

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

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-400 p-3 rounded-lg">
              <IoLibrary className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Book Inventory
              </h1>
              <p className="text-gray-500 mt-1">Manage your book shop</p>
            </div>
          </div>

          <div className=" flex flex-col md:mt-0 mt-4 md:w-auto w-full ">
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
                books={books}
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
