
import { connectDB } from "./src/db/connect.DB.js"
import { app } from "./app.js"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {

        app.listen(process.env.PORT)
        console.log(`Server is running on Port: ${process.env.PORT}`);
    })
    .catch((err) => {
        console.log("Mongodb Conecttion faild !!", err);
    })
