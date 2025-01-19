import { Router } from "express"
import {adminLogin , adminDashboard}  from '../controller/admin.js'

const router=Router();


router.post("/api/login", adminLogin);

router.get('/api/users', adminDashboard);

  


export default router
