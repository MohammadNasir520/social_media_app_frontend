import { useContext, useState } from "react";
import { uploadImage } from "../api/uploadImage";
import { createPost } from "../api/post";
import { AuthContext } from "../context/AuthProvider";
import { getUserByEmail } from "../api/userApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const CreatePostCard = () => {
    const { user } = useContext(AuthContext)

    const [disable, setDisable] = useState(false)
    const [photoURL, setPhotURL] = useState('')

    const navigate = useNavigate()



    const handleOnchageImgField = (event) => {

        const image = event.target.files[0]
        console.log(image, 'img')
        setDisable(true)
        setDisable(true)
        uploadImage(image)
            .then(photoURL => {
                console.log(photoURL)
                if (photoURL) {
                    setPhotURL(photoURL)
                    setDisable(false)
                }
            })
            .catch(error => {
                console.log(error)
            })



    }



    const handleSubmit = (event) => {
        event.preventDefault()
        if (!user) {
            toast.error('Please Signin to Post')
            navigate("/signin");
            return;
        }


        const text = event.target.elements.text.value

        if (photoURL == '' && text == '') {
            return toast.error("image and text both can't be empty at the same time")
        }
        getUserByEmail(user?.email)
            .then(data => {
                console.log('getemail', data)
                if (data) {
                    const post = {
                        text: text,
                        image: photoURL,
                        user: data?.data?._id
                    }

                    createPost(post)
                        .then(data => {
                            console.log('post', data)
                            if (data.success == true) {
                                setPhotURL("")
                                event.target.reset()
                            }
                        })
                }

            })


    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-center"
        >
            <div className="flex items-center">
                {/* upload pic field */}
                <div
                    onClick={() => {
                        if (!user) {
                            toast.error('please login to upload photo')
                            navigate('/')
                            return
                        }
                    }}
                    onChange={handleOnchageImgField}
                    className="my-3"
                >
                    <div className=" justify-center   bg-[#d7ccc8]">
                        <label className="lg:w-40 h-[67px]  flex flex-col items-center  bg-[#d7ccc8] text-blue  shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg className="w-5 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-xs lg:text-base leading-normal">upload pic</span>
                            <input type='file' className="hidden" disabled={!user} />
                        </label>
                    </div>
                </div>

                {/* text area */}
                <div className="w-[60%]  lg:w-96  ">
                    <div className="relative w-full min-w-[200px]">
                        <textarea
                            className="peer h-[63px]  w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            name="text"
                        ></textarea>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Write Your Post
                        </label>
                    </div>
                </div>

                {/* post button */}
                <button className={`disabled:opacity-50`} disabled={disable ? true : false} >

                    <span type='submit' className="  text-white h-[65px] text-sm font-bold rounded-lg bg-blue-500 inline-block flex items-center px-4 cursor-pointer">post</span>
                </button>



            </div>

        </form>
    );
};

export default CreatePostCard;