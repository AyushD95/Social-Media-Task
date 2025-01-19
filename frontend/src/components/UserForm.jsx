import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialMediaHandle", socialHandle);
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("http://localhost:5000/user/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Submission successful!");
      setName("");
      setSocialHandle("");
      setImages([]);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to submit. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>User Submission Form</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "10px", width: "300px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Social Media Handle"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            style={{ padding: "10px", width: "300px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            style={{ padding: "10px" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
