

import { useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('email', email)
        console.log('pass', password)
    }

    return (
        // bg - cyan - 950
        <div className="  rounded-md">
            signIn
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8  ">
                <div className="mx-auto max-w-lg shadow-xl bg-teal-950 shadow-cyan-100">
                    <form
                        onSubmit={handleSubmit}
                        action=""
                        className="mb-0 mt-6 space-y-1 rounded-lg p-2 shadow:p-6 lg:p-8 text-white"
                    >
                        <p className="text-center text-lg font-medium "> SignIn to Your account</p>


                        <div>

                            <div className="relative">
                                <label htmlFor="email" className="">Your Email</label>
                                <input
                                    type="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="w-full bg-cyan-950  rounded-lg border-gray-200 p-2 pe-12  shadow-sm outline-none"
                                    placeholder="Enter email"

                                />


                            </div>
                        </div>

                        <div className="mb-2">

                            <label htmlFor="password" className=" "> Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="w-full bg-cyan-950  rounded-lg border-gray-200 p-2 pe-12  shadow-sm outline-none"
                                    placeholder="Enter password"
                                />


                            </div>
                        </div>



                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            SignIn
                        </button>

                        <p className="text-center text-lg text-white">
                            No account?
                            <Link to={'/signup'} className="underline  bg-transparent text-zinc-200 mx-2 font-bold" href="/pages/SignUp">SignUp</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;