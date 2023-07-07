/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";



export const AuthContext = createContext()
const auth = getAuth(app)



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    console.log(user)
    const createUserByEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    //set users information
    const updateUser = (name) => {

        const profile = {
            displayName: name,
        }
        return updateProfile(auth.currentUser, profile)
    }

    const loginByEmailAndPassWord = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    };

    //set current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

        })
        return () => unsubscribe();
    }, [])

    // logout
    const logout = () => {
        return signOut(auth)
    }
    const authInfo = {
        createUserByEmail,
        updateUser,
        loginByEmailAndPassWord,
        user,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;