import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaBuilding,
  FaDollarSign,
  FaLanguage,
  FaBook
} from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import dummyImage from "../assets/dummy.png"

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://api.itbook.store/1.0/books/${id}`
        );


        if (response.status == 200) {
          setBookDetails(response?.data);
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  if (!bookDetails && !loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className=" text-center">
          <h2 className="text-2xl font-bold text-gray-900">Book not found</h2>
          <p className="mt-2 text-gray-600">The book are doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 inline-flex items-center space-x-2 cursor-pointer text-orange-600 "
          >
            <FaArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl   mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 cursor-pointer text-white p-2 rounded-2xl mb-8 group bg-orange-400"
        >
          <FaArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-150"
          />
          <span>Back to dashboard</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r bg-gray-200">
            <div className="flex items-center space-x-4">
              
                <img src={bookDetails?.image ? bookDetails?.image : dummyImage} className=' max-w-[50px] md:max-w-[100px] w-full '/>
           
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {bookDetails?.title}
                </h1>
                <p className="text-gray-700 mt-1">Book Details</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <FaUser className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="text-md  text-gray-900">
                      {bookDetails?.authors}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaBuilding className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Publisher</p>
                    <p className="text-md  text-gray-900">
                      {bookDetails?.publisher}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaLanguage className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="text-md  text-gray-900">
                      {bookDetails?.language}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaBook className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">ISBN</p>
                    <p className="text-md  text-gray-900">
                      {bookDetails?.isbn13}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <FaDollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-md text-gray-900">
                      {bookDetails?.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <IoStarSharp className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Rating
                    </p>
                    <p className="text-md  text-gray-900">
                      {bookDetails?.rating} 
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-md  text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {bookDetails?.
desc
}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
