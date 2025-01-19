import { Router } from "express"
import userUpload from '../controller/user.js'
import upload from '../upload.js';



const router=Router();



router.post('/api/upload', upload.array('images'), userUpload);



export default router