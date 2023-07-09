/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createComment, getAllCommentsOfSinglePost } from "../api/commentApi";
import { toast } from "react-hot-toast";
import { getUserByEmail } from "../api/userApi";
import { AuthContext } from "../context/AuthProvider";
import { createReact, getAllReactsOfSinglePost } from "../api/reactApi";





const PostCard = ({ post }) => {
    const { user: loggedInUser } = useContext(AuthContext)
    const { image, text, user, _id } = post
    const { image: userImage, name, } = user

    const [currentUser, setCurrentUser] = useState([])
    const [reacts, setReacts] = useState([])
    const [comments, setComments] = useState([])

    const [commentText, setCommentText] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps




    useEffect(() => {
        getUserByEmail(loggedInUser?.email)
            .then(data => {
                setCurrentUser(data.data)
            })

    }, [loggedInUser?.email])


    useEffect(() => {
        fetchAllCommentsOfSinglePost()

    }, [_id])

    const fetchAllCommentsOfSinglePost = () => getAllCommentsOfSinglePost(_id)
        .then(data => {
            setComments(data.data)
        })

    useEffect(() => {

        fetchGetAllReactsOfSinglePost()
    }, [_id])

    const fetchGetAllReactsOfSinglePost = () => getAllReactsOfSinglePost(_id)
        .then(data => {
            setReacts(data.data)
        })
    console.log('reacts', reacts)

    const handleComment = () => {
        if (commentText == "") {
            return toast.error("please write your comment first")
        }
        const comment = {
            text: commentText,
            post: _id,
            user: currentUser?._id

        }

        createComment(comment)
            .then(data => {
                console.log(data)

                if (data.success == true) {
                    toast.success(` Hei ${name}..your comment is added !`)
                    setCommentText("")

                }
            })

    }

    const handleCreateReact = (reaction, postId, userId) => {
        const react = {
            react: reaction,
            post: postId,
            user: userId
        }
        createReact(react)
            .then(data => {
                console.log(data)
                fetchGetAllReactsOfSinglePost()
            })

        console.log(react)
    }

    const isReacted = reacts.filter(react => react?.user?._id === currentUser?._id)
    console.log('is react', isReacted)

    return (
        <div className="flex justify-center">

            <div className="w-[90%] md:w-[60%] lg:w-[45%] flex justify-center items-center mt-4">
                <div className=" container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">

                    {/* profile pic of post user's */}
                    <div className="flex items-center space-x-2">
                        <img className="w-10 h-10 rounded-full" src={userImage} alt="sara" />
                        <h2 className="text-gray-800 font-bold cursor-pointer">{name}</h2>
                    </div>

                    {/* post text  */}
                    <div>
                        <p>{text}</p>
                    </div>

                    <img className="w-full h-[400px] md:h-[450px]  lg:h-[500px] cursor-pointer" src={image} alt="" />
                    <div className="flex p-4 justify-between">

                        <div className="flex space-x-2">
                            <div className="flex space-x-1 items-center">

                                <span
                                    onClick={() => handleCreateReact('love', _id, currentUser?._id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className={`h-7 w-7 ${isReacted.length > 0 ? " text-red-500" : "text-slate-300"} hover:text-red-400 transition duration-100 cursor-pointer`}
                                        viewBox="0 0 20 20" fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </span>


                                <span>{reacts.length}</span>

                            </div>

                            {/* comment Icon */}
                            <Link
                                to={`/post/${_id}`}
                            >

                                <div className="flex space-x-1 items-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </span>
                                    <span>{comments.length}</span>
                                </div>
                            </Link>


                        </div>

                        {/* comment field */}
                        {/* <div className="w-72">

                            <div className="relative h-10 w-full min-w-[200px]">
                                <div className="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                    <i className="fas fa-heart text-black" aria-hidden="true"></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>

                                </div>

                                <input
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=""
                                    name="comment"
                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Your comment
                                </label>
                            </div>
                        </div> */}


                        <div className="w-72">
                            <div className="relative h-10 w-full min-w-[200px]">
                                <div
                                    onClick={handleComment}
                                    className="absolute cursor-pointer top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                                >

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-red-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>

                                </div>
                                <input
                                    onChange={(event) => setCommentText(event.target.value)}
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                    value={commentText}
                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Write Your Comment
                                </label>
                            </div>
                        </div>
                        <Link
                            to={`/post/${_id}`}
                            className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block flex items-center px-4 cursor-pointer"
                        >
                            <span

                            >
                                Details..
                            </span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostCard;