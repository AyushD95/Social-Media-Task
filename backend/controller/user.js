import { io }  from '../server.js';
import User from "../models/user.js";



async function userUpload (req, res)
{
    try {
      const { name, socialMediaHandle } = req.body;
      const images = req.files.map(file => file.path); 
  
      const user = new User({ name, socialMediaHandle, images });
      await user.save();

      console.log(user.images)  

      io.emit('new-submission', user);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }



  export default userUpload;