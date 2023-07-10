/* eslint-disable react/no-unknown-property */
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import { gmailSignupDataSaveToDB, saveUerToDatabase } from "../../api/userApi";
import { GoogleAuthProvider } from "firebase/auth";
import { uploadImage } from "../../api/uploadImage";
import Spinner from "../../shared/Spinner";


const SignUp = () => {
    const { createUserByEmail, updateUser, logingByGmail } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const googleProvider = new GoogleAuthProvider()

    const location = useLocation()
    const form = location.state?.from?.pathname || '/'
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const image = event.target.image.files[0]



        setLoading(true)
        uploadImage(image)
            .then(photoURL => {
                console.log(photoURL)
                if (photoURL) {
                    const initialUser = {
                        name, email, password, confirmPassword, image: photoURL
                    }
                    createUserByEmail(email, password)
                        .then(result => {
                            const user = result.user
                            console.log(user)

                            // update user information of firebase
                            updateUser(name, photoURL)

                            if (user) {

                                event.target.reset()

                                saveUerToDatabase(initialUser)
                                    .then(data => {
                                        console.log(data)
                                        setLoading(false)
                                        toast.success("user created and saved success fully")
                                        navigate(form)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        setLoading(false)
                                        toast.error(error.message)
                                    })
                            }

                        })
                        .catch(error => {
                            console.log(error)
                            setLoading(false)
                            toast.error(error.message)
                        })

                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                toast.error(error.message)
            })




    }

    const handleGoogleSignUp = () => {
        logingByGmail(googleProvider)
            .then(result => {
                const user = result.user
                if (user.uid) {


                    const initialUser = {
                        name: user.displayName,
                        email: user.email,
                        image: user.photoURL
                    }
                    gmailSignupDataSaveToDB(initialUser)
                        .then(data => {
                            console.log(data)
                            toast(`${user.displayName} created account successfully`)
                            navigate(form)
                        })
                        .catch(error => {
                            console.log(error)
                            setLoading(false)
                        })
                }
            })
    }

    return (


        <div className="mx-auto max-w-screen-xl   sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-lg shadow-xl bg-teal-950 shadow-cyan-100">


                <form
                    onSubmit={handleSubmit}
                    className="mb-0 mt-6 space-y-1 rounded-lg p-2 shadow:p-6 lg:px-8 pt-8  text-white"
                >
                    <p className="text-center text-lg font-medium ">Create a new account</p>

                    <div>

                        <div className="relative">
                            <label htmlFor="name" className="">Your Full Name</label>
                            <input
                                required
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
                                required
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
                                required
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
                                required
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
                                required

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
                        {loading ? <Spinner></Spinner> : 'Sign Up'}
                    </button>



                </form>

                <button
                    onClick={handleGoogleSignUp}
                    className="mx-auto flex items-center justify-center bg-indigo-600  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                    <span>Continue with Google</span>
                </button>


                <p className="text-center text-sm text-white">
                    already have an account?
                    <Link to={'/signin'} className="underline mx-2 mb-2 bg-transparent text-lg font-bold text-zinc-200" href="/pages/Login">Sign in</Link>
                </p>
            </div>
        </div>

    );
};

export default SignUp;