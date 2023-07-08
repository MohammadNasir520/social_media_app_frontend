import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../api/post";


const Media = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        getAllPosts()
            .then(data => {
                console.log(data)
                setPosts(data.data)
            })
    }, [])
    console.log(posts)

    return (
        <div className="" >
            {
                posts?.map(post => <PostCard
                    key={post._id}
                    post={post}
                >
                </PostCard>)
            }


        </div>
    );
};

export default Media;