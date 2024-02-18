import MemberRoutes from "./MemberRoutes.js";
import {Router} from "express";

const router = Router();

router.use(MemberRoutes)

router.use('/', (req, res) => {
    res.send('API MANANCIAL ASSEMBLEIAS OK!')
})

export default router;