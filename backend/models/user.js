import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  socialMediaHandle: 
  { 
    type: String, 
    required: true 
  },
  
  images: { 
    type: [String], 
    required: true 
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
