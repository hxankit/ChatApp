import express from "express"
import cookieParser from "cookie-parser";
const app = express();

// app.get("/", (req, res) => {
//     res.send("hellowjskjjks")
// })
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


import authRouter from "./src/routes/auth.routes.js"
import messageRouter from "./src/routes/message.routes.js"
import userRouter from "./src/routes/user.routes.js"

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/users", userRouter)








export { app }