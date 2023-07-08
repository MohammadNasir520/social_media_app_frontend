/* eslint-disable react/prop-types */

import { useLoaderData } from "react-router-dom";
import CommentSectionCard from "../../components/CommentSectionCard";





const PostDetails = () => {
    const post = useLoaderData()




    const { image, text, user } = post.data[0]
    const { image: userImage, name } = user
    console.log('loader data', post.data[0])
    return (
        <div>

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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>



                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span>20</span>

                                </div>
                                <div className="flex space-x-1 items-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </span>
                                    <span>22</span>
                                </div>


                            </div>
                            <div className="w-72">
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <div className="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                        <i className="fas fa-heart text-black" aria-hidden="true"></i>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>

                                    </div>
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        placeholder=" "
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Your comment
                                    </label>
                                </div>
                            </div>
                            <span className="text-white text-xs font-bold rounded-lg bg-green-500 inline-block flex items-center px-4 cursor-pointer">Details..</span>
                        </div>
                    </div>

                </div>
            </div>
            <div  >

                <CommentSectionCard></CommentSectionCard>
            </div>
        </div>
    );
};

export default PostDetails;