import express  from 'express';

import 'dotenv/config'



const PORT = process.env.PORT || 5001;
const app = express();


app.use("/",(req,res)=>{
    res.send("hi")
})


  

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
