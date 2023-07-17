import { Router } from "express";
import { addCar, getCars } from "../controllers/carController.js";
import authCheck from "../middlewares/auth.js";
const router = Router();

router.get('/all', getCars);
router.post('/new', authCheck, addCar);
//

export default router;