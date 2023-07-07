
import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFonund from "../pages/NotFonund";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../layout/Main";
import Media from "../pages/Media/Media";
import About from "../pages/About/About";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [

            {
                index: true,
                path: "/",
                element: <Home />,
            },
            {
                path: "/signin",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/media",
                element: <Media />,
            },
            {
                path: "/about",
                element: <About />,
            },

        ]

    },
    {
        path: "*",
        element: <NotFonund />,
    },
]);

export default router