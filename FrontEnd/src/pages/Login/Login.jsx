import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/login';



function Login() {
    const [userName, setUsername] = useState("")
    const [password, setpassword] = useState("")

    const { loading, login
    } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userName, password)

    }
    return (
        <div className='p-4 flex items-center justify-center'>
            <div className='p-6 w-full max-w-md rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login <span className='text-blue-500'>ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={userName}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e) => { setpassword(e.target.value) }}
                        />
                    </div>
                    <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>


                    <div>
                        <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Sign In"}  {/* Change "SignUp" to "Sign In" */}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );

}

export default Login