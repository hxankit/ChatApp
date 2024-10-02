import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = async (userId, res) => {
    const Token = jwt.sign({ userId }, process.env.JWT_TOKEN, { expiresIn: "15d" })

    res.cookie("jwt", Token, {
        maxage: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    })
}

export default generateTokenAndSetCookie