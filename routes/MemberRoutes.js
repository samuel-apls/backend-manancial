import {Router} from "express";
import middleware from "../middlewares/middlewares.js";
import MemberController from "../controllers/MemberController.js";

const router = Router();

router.post("/member", middleware.verifyNewMember, MemberController.createManancialMember)
router.post("/qualificationsMember", middleware.checkQualificationsMember, MemberController.createMemberQualification)
router.get("/getMember", MemberController.requestManancialMember)

export default router;