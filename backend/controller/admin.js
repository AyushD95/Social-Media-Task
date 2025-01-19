import User from "../models/user.js";
import 'dotenv/config'



async function adminLogin(req,res) {

    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) 
    {
      res.status(200).json({ success: true, message: "Login successful" });
    } 
    else 
    {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
}


async function adminDashboard(req,res) {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}





export {adminLogin , adminDashboard}