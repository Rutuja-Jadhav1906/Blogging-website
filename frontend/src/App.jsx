import React, { useState } from "react";
import Navbar from "./components/Navbar1";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import DeleteBlog from "./pages/DeleteBlog";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import SearchResults from "./components/SearchResults";
import { AuthProvider } from "./AuthProvider";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <>
      <Navbar setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/search-results"
          element={<SearchResults searchResults={searchResults} />}
        />
        <Route path="/add" element={<AddBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/:id" element={<MyBlogs />} />
        <Route path="/delete/:id" element={<DeleteBlog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
