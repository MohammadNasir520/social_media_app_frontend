/* eslint-disable react/prop-types */
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";



export const AuthContext = createContext()
const auth = getAuth(app)



const AuthProvider = ({ children }) => {

    const createUserByEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    //set users information
    const updateUser = (userInfo) => {

        const profile = {
            displayName: userInfo.name,

        }
        return updateProfile(auth.currentUser, profile)
    }


    const authInfo = {
        createUserByEmail,
        updateUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;