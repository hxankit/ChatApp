import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute =async (req,res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(400).json({ error: "Unauthorised request" })
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    
    if (!decoded) {
        return res.status(400).json({ error: "Unauthorised ! Invalid token" })
    }

    const user=await User.findById(decoded.userId).select("-password")
    
    if (!user) {
        return res.status(400).json({ error: "User Not found" })
    }
    req.user = user
    next()
}


export { protectRoute }

