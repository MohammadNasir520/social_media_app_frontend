// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProvider";

import CreatePostCard from "../../components/CreatePostCard";
import PostCard from "../../components/PostCard";


const Home = () => {
    // const { user } = useContext(AuthContext)
    return (
        <div>
            <CreatePostCard></CreatePostCard>
            <PostCard></PostCard>
        </div>
    );
};

export default Home;