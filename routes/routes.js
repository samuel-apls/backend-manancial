import MemberRoutes from "./MemberRoutes.js";
import {Router} from "express";

const routes = Router();

routes.use(MemberRoutes)

routes.use('/', (req, res) => {
    res.send('API MANANCIAL ASSEMBLEIAS OK!')
})

export default routes;