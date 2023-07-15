import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { getUserByEmail } from "../api/userApi";
import pic from "../assets/pic.jpg"

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const { user, logout } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState([])

    const navigate = useNavigate()
    const fetchgetUserByEmail = () => getUserByEmail(user?.email)
        .then(data => {
            setCurrentUser(data.data)
        })

    useEffect(() => {
        fetchgetUserByEmail()
    }, [user?.email, currentUser?.image, fetchgetUserByEmail])






    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/signin')

            })
            .catch(err => {
                console.log(err)
            })
    }

    const navItems = <>
        <li><NavLink
            onClick={() => setMenuOpen(false)}
            to={'/'}
            className={({ isActive }) =>
                isActive ? `text-blue-700 font-bold p-4` : `${isMenuOpen ? "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50  rounded" : "text-sm text-gray-400 hover:text-gray-500 "}  `} >
            Home</NavLink></li>

        <li><NavLink
            onClick={() => setMenuOpen(false)}
            to={'/media'}
            className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold p-4" : `${isMenuOpen ? "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50  rounded" : "text-sm text-gray-400 hover:text-gray-500 "}  `} >
            Media</NavLink></li>

        <li><NavLink
            onClick={() => setMenuOpen(false)}
            to="/message" className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold p-4" : `${isMenuOpen ? "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50  rounded" : "text-sm text-gray-400 hover:text-gray-500 "}  `} >
            Message</NavLink></li>

        <li><NavLink
            onClick={() => setMenuOpen(false)}
            to={'/about'}
            className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold p-4" : `${isMenuOpen ? "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50  rounded" : "text-sm text-gray-400 hover:text-gray-500 "}  `}>
            About</NavLink></li>

    </>

    const signOption = <div className=" lg:flex">
        {
            user && user?.uid
                ?
                <NavLink
                    onClick={handleLogout}

                    className={`${isMenuOpen ? "block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" : "hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 "}`} >
                    SignOut
                </NavLink>

                :
                <>

                    <NavLink
                        to={'/signin'}
                        className={`${isMenuOpen ? "block px-4 py-3 mb-3  text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl" : "hidden  lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200 "}`} >
                        Sign In
                    </NavLink>
                    <NavLink

                        to={'/signup'}
                        className={`${isMenuOpen ? "block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" : "hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 "}`} >
                        SignUp
                    </NavLink>
                </>

        }
        <div className="flex items-center space-x-2 m ">
            <img className="w-10 h-10 rounded-full" src={`${currentUser?.image}`} alt="pp" />
            {isMenuOpen && <h2 className="text-gray-800 font-bold cursor-pointer">{user?.displayName}</h2>}
        </div>
    </div>

    const logo = <img className="h-10 w-10" src={pic} alt="" />

    return (
        <div>
            <div className="bg-blue-500">
                <nav className="relative px-4 py-4 flex justify-between items-center  bg-white">
                    <div className="flex space-x-5">
                        <NavLink className="text-3xl font-bold leading-none " >
                            {
                                logo
                            }
                        </NavLink>
                        <NavLink className="text-3xl font-bold leading-none " >
                            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                Social_Media
                            </h4>
                        </NavLink>
                    </div>

                    <div onClick={() => setMenuOpen(!isMenuOpen)} className={`${isMenuOpen ? "hidden" : "block"}  lg:hidden`}>
                        <button className="navbar-burger flex items-center text-blue-600 p-3">
                            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>open menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">

                        {navItems}

                    </ul>
                    <div className="hidden lg:block">
                        {signOption}

                    </div>

                </nav>
                <div className={`navbar-menu relative z-50  ${isMenuOpen ? "" : "hidden"}`}>
                    <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto ">
                        <div className="flex items-center mb-8">
                            {/* logo */}
                            <NavLink className="mr-auto text-3xl font-bold leading-none" >
                                {
                                    logo
                                }
                            </NavLink>
                            <button onClick={() => setMenuOpen(false)} className="navbar-close">
                                <title>close menu</title>
                                <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <ul>


                                {navItems}
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <div className="pt-6">

                                {signOption}
                            </div>
                            <p className="my-4 text-xs text-center text-gray-400">
                                <span>Copyright © 2023</span>
                            </p>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;