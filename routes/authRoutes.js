import { Router } from "express";
import {registerUser, verifyEmail} from "../controllers/authController.js"
const router = Router();

// register /api/v1/user/register
router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);



export default router;