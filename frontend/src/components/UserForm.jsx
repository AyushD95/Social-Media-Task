import React, { useState , useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button

    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialMediaHandle", socialHandle);
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post("https://backetest-1.onrender.com/user/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Submission successful!");
      setName(""); // Clear inputs
      setSocialHandle("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      setImages([]);
      setIsSubmitting(false); // Enable the button
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit. Please try again.");
      setIsSubmitting(false); // Enable the button
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: "#121212", // Dark mode background
        color: "#f0f0f0", // Light text color
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>User Submission Form</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          backgroundColor: "#1e1e1e", // Form background
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              backgroundColor: "#333",
              color: "#f0f0f0",
              border: "1px solid #555",
              borderRadius: "5px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Social Media Handle"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              backgroundColor: "#333",
              color: "#f0f0f0",
              border: "1px solid #555",
              borderRadius: "5px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            

            style={{
              padding: "10px",
              backgroundColor: "#333",
              color: "#f0f0f0",
              border: "1px solid #555",
              borderRadius: "5px",
            }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting} // Disable button during submission
          style={{
            padding: "10px 20px",
            backgroundColor: isSubmitting ? "#555" : "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
