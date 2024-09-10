import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSpecificTask } from "../redux/user/taskSlice";

const Task = () => {
  const [files, setFiles] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!files) {
      console.log("No files selected");
      return;
    }

    // Appending selected files to formData
    Array.from(files).forEach((file, index) => {
      formData.append("file", file[0]);
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    let headers = {};
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = {
        Authorization: `${token}`,
      };
    }

    try {
      const result = await fetch("http://localhost:5500/files/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await result.json();
      console.log("This is the data", data);
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  useEffect(() => {
    dispatch(fetchSpecificTask(id));
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <h1>Individual Tasks</h1>
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <h1>File Upload</h1>
        <input type="file" name="file" multiple onChange={handleFileChange} />
        <button type="submit" className="submit">
          Upload a file
        </button>
      </form>
    </div>
  );
};

export default Task;
