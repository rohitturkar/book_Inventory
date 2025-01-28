import React,{useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BookDetails from "./Pages/Details";
import AddBook from "./Pages/Add";
import Layout from "./Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
    const [books, setBooks] = useState([]);
    const [loading,setLoading]=useState(false)

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

    
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home setLoading={setLoading} loading={loading} setBooks={setBooks} books={books} />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/book/new" element={<AddBook setLoading={setLoading} loading={loading} setBooks={setBooks} books={books} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
