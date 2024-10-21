import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Make sure to import cors

const app = express();


// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if needed (e.g., cookies)
}));

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Import routers

import authRouter from "./src/routes/auth.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import userRouter from "./src/routes/user.routes.js";

// Use routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/users", userRouter);

export { app };
