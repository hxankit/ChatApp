import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateTokenAndSetCookie from "../utills/generateToken.js";


const registerUser = async (req, res) => {

    try {
        const { fullName, userName, password, gender } = req.body
        if ([fullName, userName, password, gender].some((field) =>
            field?.trim() === "")
        ) {
            res
                .status(400)
                .json({ error: "All files are required" })
        }

        const existedUser = await User.findOne({ userName })

        if (existedUser) {
            return res.status(400).json({ error: "User already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();




        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
            message:"User Created Succesfully"
        })


    } catch (error) {
        console.log(error?.message);
        res

            .status(500)
            .json({ error: "Internal server error" })
    }

}



const loginUser = async (req, res) => {
    const { userName, password } = req.body
    const logUser = await User.findOne({ userName })
    

    const isPasswordCorrect = await bcrypt.compare(password, logUser.password || "")
    
    
    if (!logUser && !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid User Creadiantails" })

    }

    generateTokenAndSetCookie(logUser._id, res);

    

    return res.status(201).json({
        _id: logUser._id,
        fullName: logUser.fullName,
        userName: logUser.userName,
        profilePic: logUser.profilePic,
        message: "User logeding Succesfully"
    })
} 

const logoutUser = (req, res) => {
    
    res.cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true, // Ensure it's still httpOnly for security
        sameSite: "strict" // Add this for security as well
    });

    return res.status(200).json({ message: "User logged out successfully" });
};














export {
    registerUser, loginUser, logoutUser
}