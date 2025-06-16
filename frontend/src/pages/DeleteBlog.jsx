import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Blogs from "./Blogs";

const DeleteBlog = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem("authToken");
  console.log(authToken);

  useEffect(() => {
    const deleteBlog = async () => {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/blogs/${id}`,
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );
        alert(res.data.message);
        // console.log(blog);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    deleteBlog();
  }, [id]);

  return <Blogs />;
};

export default DeleteBlog;
