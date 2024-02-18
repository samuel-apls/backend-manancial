import {Router} from "express";

const router = Router();

router.post("/member", MemberController.createMember)

export default router;