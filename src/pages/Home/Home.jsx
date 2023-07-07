import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";


const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            {user?.displayName}
        </div>
    );
};

export default Home;