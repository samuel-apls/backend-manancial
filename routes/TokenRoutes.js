import {Router} from "express";
import middlewareAuthentication from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.get("/tokenValidity", middlewareAuthentication.checkTokenValidity)

export default router;