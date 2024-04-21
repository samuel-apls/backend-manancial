import {Router} from "express";
import AuthController from "../controllers/AuthController.js";
import middlewareAuthentication from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.post("/login", AuthController.login)

router.post("/forgotPassword", AuthController.forgotPassword)
router.post("/checkTokenPassword", AuthController.checkTokenPassword)
router.post("/resetPassword", middlewareAuthentication.checkTokenPasswordValidity, AuthController.resetPassword)

export default router;