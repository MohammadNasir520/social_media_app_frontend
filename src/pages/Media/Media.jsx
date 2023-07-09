import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../api/post";
import FullPageSpinner from "../../shared/FullPageSpinner";


const Media = () => {


    const [loading, setLoading] = useState(true)

    const [posts, setPosts] = useState([])
    const paginationOptions = {
        page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc'
    }

    useEffect(() => {
        setLoading(true)
        getAllPosts(paginationOptions)
            .then(data => {
                console.log(data)
                setPosts(data.data)
                setLoading(false)
            })
    }, [])
    console.log(posts)

    if (!posts) {
        return <FullPageSpinner></FullPageSpinner>
    }

    return (

        <>
            {
                loading
                    ?
                    <div className="h-screen">

                        <FullPageSpinner></FullPageSpinner>
                    </div>
                    :
                    <div className="" >
                        {
                            posts?.map(post => <PostCard
                                key={post._id}
                                post={post}
                            >
                            </PostCard>)
                        }


                    </div>


            }
        </>


    );
};

export default Media;