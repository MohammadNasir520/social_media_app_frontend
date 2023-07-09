/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";



export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)
    const createUserByEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    //set users information
    const updateUser = (name, photoURL) => {

        const profile = {
            displayName: name,
            photoURL: photoURL

        }
        return updateProfile(auth.currentUser, profile)
    }

    const loginByEmailAndPassWord = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    };

    const logingByGmail = (provider) => {
        return signInWithPopup(auth, provider)
    }

    //set current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
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
        logingByGmail,
        user,
        logout,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;