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
                                    })
                            }

                        })
                        .catch(error => {
                            console.log(error)
                            setLoading(false)
                        })

                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
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
                    className="mb-0 mt-6 space-y-1 rounded-lg p-2 shadow:p-6 lg:p-8 text-white"
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

                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                >
                    Sign Up with Gmail
                </button>
                <p className="text-center text-sm text-white">
                    already have an account?
                    <Link to={'/signin'} className="underline mx-2 bg-transparent text-lg font-bold text-zinc-200" href="/pages/Login">Sign in</Link>
                </p>
            </div>
        </div>

    );
};

export default SignUp;