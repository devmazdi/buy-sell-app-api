import { Router } from "express";
import { addCar, getCars } from "../controllers/carController.js";
const router = Router();

router.get('/all', getCars);
router.post('/new', addCar);
//

export default router;