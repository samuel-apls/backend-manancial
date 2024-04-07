import MemberRoutes from "./MemberRoutes.js";
import ActivityRoutes from "./ActivityRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import TokenRoutes from "./TokenRoutes.js";
import {Router} from "express";

const router = Router();

router.use(MemberRoutes)
router.use(ActivityRoutes)
router.use(AuthRoutes)
router.use(TokenRoutes)

router.use('/', (req, res) => {
    res.send('API MANANCIAL ASSEMBLEIAS OK!')
})

export default router;