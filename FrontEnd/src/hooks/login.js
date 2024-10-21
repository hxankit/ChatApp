import toast from "react-hot-toast";
import { useAuthContext } from '../contexts/authcontexts';
import { useState } from 'react';

const useLogin = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false); // Updated variable name


    const login = async (userName, password) => {
        const succes = handleInputError({ userName, password })
        if(!succes) return

        setLoading(true); // Updated variable name
        try {
            const res = await fetch("http://localhost:8000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
            // console.log(error.message);
        } finally {
            setLoading(false); // Updated variable name
        }
    };

    return { loading, login }; // This is correct
};

export default useLogin;

function handleInputError({ userName, password }) {
    if (!userName || !password) {
        toast.error("Please fill both fields")
        return false 
    }
    return true
}


