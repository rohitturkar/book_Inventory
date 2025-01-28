import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";


const BookTable = ({ books, onDelete, onEdit,loading }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className=" bg-gray-50 rounded-lg text-xs">
          <tr>
         
            <th className="px-6 py-4 text-gray-500 uppercase font-medium ">
              Title
            </th>
            
            <th className="px-6 py-4 text-gray-500 uppercase font-medium">
              ISBN
            </th>
            <th className="px-6 py-4 text-gray-500 uppercase font-medium">
              Price
            </th>
            <th className="px-6 py-4 text-gray-500 uppercase font-medium">
              Stock
            </th>
            <th className="px-6 py-4 text-gray-500 uppercase font-medium">
              Actions
            </th>
          </tr>
        </thead>

        {
          loading?<div className='flex justify-center items-center text-center py-10'>Loading...</div>:  <tbody className="divide-y divide-gray-100 ">
          { 
            books?.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 text-xs ">


                <td className="px-6 py-4 text-xs whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {book.title}
                    </span>
                    <button
                      onClick={() => navigate(`/book/${book.id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    ></button>
                  </div>
                </td>
           
                <td className="px-6 py-4 text-xs whitespace-nowrap text-gray-600">
                  {book.isbn13}
                </td>

                <td className="px-6 py-4 text-xs whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {book.price}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      book.stock > 10
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.stocks ? book.stock : 0} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => navigate(`/book/${book.isbn13}`)}
                      className="text-orange-300 transition-colors duration-150 cursor-pointer"
                    >
                      <FaEye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(book)}
                      className="text-blue-300 transition-colors duration-150 cursor-pointer"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(book)}
                      className=" text-red-400 transition-colors duration-150 cursor-pointer"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        }
      
      </table>
    </div>
  );
};

export default BookTable;
