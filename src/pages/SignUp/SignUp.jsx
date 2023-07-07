import { useState } from "react";
import { Link } from "react-router-dom";


const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('name', name)
        console.log('email', email)
        console.log('pass', password)
        console.log('confirmPassword', confirmPassword)
    }

    return (


        <div className="mx-auto max-w-screen-xl   sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-lg shadow-xl bg-teal-950 shadow-cyan-100">


                <form
                    onSubmit={handleSubmit}
                    className="mb-0 mt-6 space-y-1 rounded-lg p-2 shadow:p-6 lg:p-8 text-white"
                >
                    <p className="text-center text-lg font-medium ">Create a new account</p>

                    <div>

                        <div className="relative">
                            <label htmlFor="name" className="">Your Full Name</label>
                            <input
                                onChange={(event) => setName(event.target.value)}
                                type="text"
                                name="name"
                                className="w-full bg-cyan-950  rounded-lg border-gray-200 p-2 pe-12  shadow-sm outline-none"
                                placeholder="Enter Name"

                            />


                        </div>
                    </div>
                    <div>

                        <div className="relative">
                            <label htmlFor="email" className="">Your Email</label>
                            <input
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                name="email"
                                className="w-full bg-cyan-950  rounded-lg border-gray-200 p-2 pe-12  shadow-sm outline-none"
                                placeholder="Enter email"

                            />


                        </div>
                    </div>

                    <div>

                        <label htmlFor="password" className=" ">Set a Password</label>
                        <div className="relative">
                            <input
                                onChange={(event) => setPassword(event.target.value)}
                                type="password"
                                name="password"
                                className="w-full bg-cyan-950  rounded-lg border-gray-200 p-2 pe-12  shadow-sm outline-none"
                                placeholder="Enter password"
                            />


                        </div>
                    </div>

                    <div>

                        <label htmlFor="password" className=" ">Confirm Password</label>
                        <div className="relative">
                            <input
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                type="password"
                                className="w-full bg-cyan-950  rounded-lg border-gray-200 p-2 pe-12  shadow-sm outline-none"
                                placeholder=" Re-enter password"
                            />


                        </div>
                    </div>
                    <div>

                        <label htmlFor="image" className=" ">Upload Profile Pic</label>
                        <div className="relative">
                            <input
                                // onChange={(event) => setConfirmPassword(event.target.value)}
                                type="file"
                                accept="image/*"
                                name="image"

                            />

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-white">
                        already have an account?
                        <Link to={'/signin'} className="underline mx-2 bg-transparent text-lg font-bold text-zinc-200" href="/pages/Login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>

    );
};

export default SignUp;