import { useState } from "react"
import { useAuthContext } from "../contexts/authcontexts"
import toast from "react-hot-toast"

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
           
            localStorage.removeItem("chat-user")
            setAuthUser(null)
            toast.success("Logged out successfully!")
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout
