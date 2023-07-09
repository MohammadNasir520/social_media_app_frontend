/* eslint-disable react/prop-types */

import { useLoaderData } from "react-router-dom";
import CommentSectionCard from "../../components/CommentSectionCard";
import PostCard from "../../components/PostCard";
import { useEffect, useState } from "react";
import { getAllCommentsOfSinglePost } from "../../api/commentApi";





const PostDetails = () => {
    const postLoder = useLoaderData()

    const post = postLoder?.data[0]
    const { _id } = post

    const [comments, setComments] = useState([])

    useEffect(() => {

        getAllCommentsOfSinglePost(_id)
            .then(data => {
                setComments(data.data)
            })
    }, [_id])



    return (
        <div>
            <PostCard
                post={post}

            ></PostCard>

            <div  >
                {
                    comments?.map(comment => <CommentSectionCard

                        key={comment._id}
                        comment={comment}
                    ></CommentSectionCard>)
                }

            </div>
        </div>
    );
};

export default PostDetails;