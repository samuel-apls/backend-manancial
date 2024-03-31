import {Router} from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();

router.post("/login", AuthController.login)
router.post("/forgotPassword", AuthController.forgotPassword)
router.post("/resetPassword", AuthController.resetPassword)

export default router;