import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
      fetchUsers();
    } else {
      setIsLoggedIn(false);
      window.location.href = '/admin-login'; 
    }

    // Initialize Socket.IO connection
    const socket = io('http://localhost:5000');

    // Listen for 'new-submission' event
    socket.on('new-submission', (newUser) => {
      setUsers((prevUsers) => [newUser, ...prevUsers]); // Add new image to the top of the list
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {isLoggedIn ? (
        <>
          <h2>Admin Dashboard</h2>
          {users.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {users.map((image) => (
                <div key={image._id} style={{ border: '1px solid #ddd', padding: '10px' }}>
                  <img
                    src={image.images[0]}
                    alt="User submission"
                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                  />
                  <p><strong>Name:</strong> {image.name}</p>
                  <p><strong>Social Handle:</strong> {image.socialMediaHandle}</p>
                  <p><strong>Uploaded At:</strong> {new Date(image.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No Users found.</p>
          )}
        </>
      ) : (
        <p>Please log in to view the dashboard.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
