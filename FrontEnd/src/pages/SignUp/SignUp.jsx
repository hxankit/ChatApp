import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/SignUp';
const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        userName: "",
        password: "",
        gender: ""
    });
    
    
    
    const {  loading, signup
} = useSignUp()
    


    const handleSubmit = async(e) => {
        e.preventDefault();
       await signup(inputs)
    };

    const handleCheckBoxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    return (
        <div className='p-4 items-center justify-center'>
            <div className='p-6 w-full max-w-md rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    SignUp <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Full Name'
                            className='w-full input input-bordered h-10'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={inputs.userName}
                            onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
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
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    {/* Gender Checkbox */}
                    <div className="flex mt-4">
                        <div className="form-control">
                            <label className={`label gap-2 cursor-pointer ${inputs.gender === "male" ? "selected" : ""}`}>
                                <span className="label-text">Male</span>
                                <input
                                    type="checkbox"
                                    className="checkbox-xs border-slate-900"
                                    checked={inputs.gender === "male"}
                                    onChange={() => handleCheckBoxChange("male")}
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className={`label mx-2 gap-2 cursor-pointer ${inputs.gender === "female" ? "selected" : ""}`}>
                                <span className="label-text">Female</span>
                                <input
                                    type="checkbox"
                                    className="checkbox-xs border-slate-900"
                                    checked={inputs.gender === "female"}
                                    onChange={() => handleCheckBoxChange("female")}
                                />
                            </label>
                        </div>
                    </div>

                    <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'
                            disabled={loading}> {loading ? <span className='loading loading-spinner'></span> :"Signup"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
