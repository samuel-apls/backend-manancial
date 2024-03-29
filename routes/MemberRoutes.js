import {Router} from "express";
import middlewareMember from "../middlewares/middlewares.js";
import middlewareAuthentication from "../middlewares/authenticationMiddleware.js";
import MemberController from "../controllers/MemberController.js";

const router = Router();

router.post("/member", middlewareAuthentication.checkAdminPermitionRole, middlewareMember.verifyNewMember, MemberController.createManancialMember)
router.post("/qualificationsMember", middlewareAuthentication.checkAdminPermitionRole, middlewareMember.checkQualificationsMember, MemberController.createMemberQualification)

router.put("/member", middlewareAuthentication.checkAdminPermitionRole, MemberController.updateManancialMember)
router.put("/qualificationsMember", middlewareAuthentication.checkAdminPermitionRole, MemberController.updateMemberQualification)

router.get("/getMember", middlewareAuthentication.checkAnyPermitionsRoles, MemberController.requestManancialMember)
router.get("/getAllMembers", middlewareAuthentication.checkAnyPermitionsRoles, MemberController.requestAllManancialMember)
router.get("/getAllMembersWithQualifications", middlewareAuthentication.checkAdminPermitionRole, MemberController.requestMemberWithQualifications)

export default router;