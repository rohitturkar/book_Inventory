import React, { useState } from "react";
import { bookSchema } from "../lib/validation";

const BookForm = ({ initialData, onSave }) => {
 
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      authors: "", 
      isbn13: "", 
      language: "",
      publisher: "",
      publishedDate: "",
      price: 0,
      stockQuantity: 0,
      desc: "",
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      await bookSchema.validate(formData, { abortEarly: false });


      onSave(formData);

    } catch (error) {
      if (error.name === "ValidationError") {
        const formattedErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path] = err.message;
          }
        });
        setErrors(formattedErrors);
    
      } else {
        console.log("Unexpected Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ["stockQuantity"].includes(name)
      ? parseFloat(value)
      : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.authors && (
            <p className="mt-1 text-sm text-red-600">{errors.authors}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            name="isbn13"
            value={formData.isbn13}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.isbn13 && (
            <p className="mt-1 text-sm text-red-600">{errors.isbn13}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Published Date
          </label>
          <input
            type="date"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.publishedDate && (
            <p className="mt-1 text-sm text-red-600">{errors.publishedDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Publisher
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.publisher && (
            <p className="mt-1 text-sm text-red-600">{errors.publisher}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="string"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity ? formData.stockQuantity : 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.stockQuantity && (
            <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.desc && (
          <p className="mt-1 text-sm text-red-600">{errors.desc}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
       
        <button
          type="submit"
          className="px-4 py-2 border cursor-pointer border-transparent rounded-md text-sm font-medium text-white bg-orange-400"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default BookForm;
