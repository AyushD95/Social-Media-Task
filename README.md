# Backend for Social Media Task

This repository contains the implementation for a social media submission task. It provides APIs for user submissions, real-time updates using Socket.IO, and image management via Cloudinary. The backend is built using **Node.js**, **Express**, **Socket.io** and **MongoDB**.

## Features

- User submission of images with associated metadata (name, social media link).
- Real-time updates for new submissions using **Socket.IO**.
- Secure image storage via **Cloudinary**.
- RESTful API endpoints for managing user data.
- MongoDB database integration for persistent storage.

### API Endpoints

#### 1) POST **/user/api/upload**

On this endipoint the uder user data from frontend is stored in mongodb and image is uploaded in cloudinary and that url is stored in mongodb

ex -

    "_id": "user_id",
    "name": "User Name",
    "socialMediaHandle": "https://example.com",
    "images": [
      "https://image-url1",
      "https://image-url2"
    ],
    "createdAt": "2025-01-19T09:54:06.964Z"


On submitting the form **io.emit('new-submission', user)** event is occured on fontend 

    socket.on('new-submission', (newUser) => {
      setUsers((prevUsers) => [newUser, ...prevUsers]);
    });
  
It add that user to previous user and using usetstate hook which automaticlll re render the data on admin dashboard 


#### 2) GET **/admin/api/users**

On this route all the existing user from database are displayed  from newwest to oldest using mongo query 

while admin is logged in if any user upload the same socket event is perfored which add new user and render using use state

#### 3) GET **/admin/api/login**

It alow admin to acess admin dashboard if entered correct username and password

