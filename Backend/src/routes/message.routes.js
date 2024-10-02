import { Router } from "express"
import { sendMessage,getMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middleware/protectroute.middleware.js"

const router = Router();

router.route("/send/:id").post(protectRoute,sendMessage)
router.route("/:id").get(protectRoute,getMessage)

export default router