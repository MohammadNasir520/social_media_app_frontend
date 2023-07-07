/* eslint-disable react/prop-types */
import { createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={'value'}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;