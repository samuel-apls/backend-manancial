import {Router} from "express";
import middlewareMember from "../middlewares/middlewares.js";
import middlewareAuthentication from "../middlewares/authenticationMiddleware.js";
import ActivityController from "../controllers/ActivityController.js";

const router = Router();

router.post("/activitiesManancial", 
    middlewareAuthentication.checkMidiaPermitionRole, 
    middlewareMember.checkActivitiesManancial, 
    ActivityController.createManancialActivity)

router.get("/activitiesManancial", 
    middlewareAuthentication.checkAnyPermitionsRoles, 
    ActivityController.requestManancialActivity)


export default router;