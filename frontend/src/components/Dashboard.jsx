import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      fetchUsers();
    } else {
      navigate('/admin'); // Redirect to the admin login page
    }

    // Initialize Socket.IO connection
    const socket = io('https://backetest.onrender.com/');

    // Listen for 'new-submission' event
    socket.on('new-submission', (newUser) => {
      setUsers((prevUsers) => [newUser, ...prevUsers]); // Add new image to the top of the list
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://backetest.onrender.com/admin/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      {users.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          {users.map((user) =>
            user.images.map((imgUrl, index) => (
              <div
                key={`${user._id}-${index}`}
                style={{
                  display: 'flex',
                  border: '1px solid white',
                  backgroundColor: '#333',
                  borderRadius: '7px',
                  alignItems: 'center',
                  marginBottom: '20px',
                  padding: '10px',
                }}
              >
                <div style={{ flex: 1, paddingRight: '20px' }}>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Social Handle:</strong>
                    <a
                      href={`${user.socialMediaHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#00aced',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        transition: 'color 0.3s',
                      }}
                    >
                      {user.socialMediaHandle}
                    </a>
                  </p>
                  <p>
                    <strong>Uploaded At:</strong>{' '}
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>

                <div style={{ flexShrink: 0 }}>
                  <img
                    src={imgUrl}
                    alt={`User submission ${index + 1}`}
                    onClick={() => openModal(imgUrl)} // Function to open modal for preview
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      marginBottom: '10px', // Space between images
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <h1>Loading.....</h1>
      )}

      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <button onClick={closeModal} style={modalStyles.closeButton}>
              X
            </button>
            <img src={selectedImage} alt="Preview" style={modalStyles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the Modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    width: '300px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
  },
};

export default AdminDashboard;
