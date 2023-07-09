// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProvider";

import { useEffect, useState } from "react";
import CreatePostCard from "../../components/CreatePostCard";
import { getAllPosts } from "../../api/post";
import PostCard from "../../components/PostCard";
import FullPageSpinner from "../../shared/FullPageSpinner";




const Home = () => {
    // const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const paginationOptions = {
        page: 1, limit: 3, sortBy: 'react', sortOrder: 'desc'
    }
    useEffect(() => {
        getAllPosts(paginationOptions)
            .then(data => {
                console.log(data)
                setPosts(data.data)
                setLoading(false)
            })
    }, [])
    return (

        <>
            {
                loading ?
                    <FullPageSpinner></FullPageSpinner>
                    :


                    <div>


                        <div>
                            <CreatePostCard></CreatePostCard>

                        </div>
                        <div className="" >
                            {
                                posts?.map(post => <PostCard
                                    key={post._id}
                                    post={post}
                                >
                                </PostCard>)
                            }


                        </div>
                    </div>
            }


        </>
    );
};

export default Home;