import Router from "express"
const router = Router()
import { protectRoute } from "../middleware/protectroute.middleware.js"
import { usersForSideBar }from "../controllers/user.controller.js"

router.route("/").get(protectRoute,usersForSideBar)

export default router