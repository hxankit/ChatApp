import React, { useState } from 'react' // Importing React and useState hook from the React library
import toast from 'react-hot-toast' // Importing toast for displaying notifications
import { useAuthContext } from '../contexts/authcontexts' // Importing custom Auth context to manage user authentication state

// Custom hook for user sign-up functionality
const useSignUp = () => {
    // Destructuring authUser and setAuthUser from the Auth context
    const { authUser, setAuthUser } = useAuthContext()

    // State to manage loading status during the sign-up process
    const [loading, setloading] = useState(false)

    // The sign-up function, which takes user input as an argument
    const signup = async ({ fullName, userName, password, gender }) => {
        // Validate user input; if there's an error, exit the function
        const succes = handleInputError({ fullName, userName, password, gender })
        if (!succes) return

        // Set loading state to true while processing the sign-up
        setloading(true)

        
        try {
            // Sending a POST request to the server to register a new user
            const res = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Specifying the content type as JSON
                body: JSON.stringify({ fullName, userName, password, gender }) // Converting user input to JSON format
            })

            // Parsing the response from the server
            const data = await res.json()

            // If the server returns an error, throw an error with the message
            if (data.error) {
                throw new Error(data.error)
            }

            // Storing user data in localStorage for future sessions
            localStorage.setItem("chat-user", JSON.stringify(data))
            // Updating the Auth context with the new user data
            setAuthUser(data)

        } catch (error) {
            // Displaying error message to the user
            toast.error(error.message)
            // Setting loading state back to false
            setloading(false)
        }
    }

    // Returning loading state and signup function for use in components
    return { loading, signup }
}

// Exporting the useSignUp hook for use in other components
export default useSignUp

// Function to handle input validation before sign-up
function handleInputError({ fullName, userName, password, gender }) {
    // Checking if any of the required fields are empty
    if (!fullName || !userName || !password || !gender) {
        toast.error("Please fill all the fields") // Notify user to fill all fields
        return false // Return false to indicate input error
    }

    // Checking if password meets the minimum length requirement
    if (password.length < 6) {
        toast.error("Password must contain at least 6 characters") // Notify user of password policy
        return false // Return false to indicate input error
    }

    // Return true if all validations pass
    return true
}
