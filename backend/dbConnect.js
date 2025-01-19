import mongoose from "mongoose"


async function dbConnect(url) {
  
 try{

    await mongoose.connect(url);
    console.log("Database Connecetd");
 }
    
 catch(err){

    console.log(`Error: ${err}`);
 }
    
}


 export default dbConnect;