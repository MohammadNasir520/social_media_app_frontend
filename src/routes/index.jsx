
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
import Message from "../pages/Message/Message";
import PostDetails from "../pages/PostDetails/PostDetails";
import PrivateRoute from "./PrivateRoute";



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
                path: "/message",
                element: <Message />,
            },
            {
                path: "/about",
                element: <PrivateRoute> <About /></PrivateRoute>,
            },
            {
                path: "/post/:id",
                loader: async ({ params }) => await fetch(`http://localhost:5000/api/v1/posts/${params.id}`),
                element: <PostDetails />,
            },

        ]

    },
    {
        path: "*",
        element: <NotFonund />,
    },
]);

export default router