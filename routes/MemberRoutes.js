import {Router} from "express";
import MemberController from "../controllers/MemberController.js";

const router = Router();

router.post("/member", MemberController.createMember)

export default router;