import User from "../models/user.model.js";
export const usersForSideBar = async (req, res) => {

    const loggedInUserId = req.user._id
    // console.log(loggedInUserId);

    const fillteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

    res.status(201).json(fillteredUsers)

}