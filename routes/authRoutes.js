import { Router } from "express";
import {registerUser, verifyEmail, loginUser} from "../controllers/authController.js"
const router = Router();

// register /api/v1/user/register
router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/auth', loginUser);




export default router;