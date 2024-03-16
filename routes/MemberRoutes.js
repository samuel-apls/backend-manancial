import {Router} from "express";
import middlewareMember from "../middlewares/middlewares.js";
import middlewareAuthentication from "../middlewares/authenticationMiddleware.js";
import MemberController from "../controllers/MemberController.js";

const router = Router();

router.post("/member", middlewareAuthentication.checkPermitionRoles, middlewareMember.verifyNewMember, MemberController.createManancialMember)
router.post("/qualificationsMember", middlewareAuthentication.checkPermitionRoles, middlewareMember.checkQualificationsMember, MemberController.createMemberQualification)
router.get("/getMember", middlewareAuthentication.checkPermitionRoles, MemberController.requestManancialMember)
router.get("/getAllMembers", middlewareAuthentication.checkPermitionRoles, MemberController.requestAllManancialMember)

export default router;