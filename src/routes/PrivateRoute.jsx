/* eslint-disable react/prop-types */

import { Navigate, useLocation } from 'react-router-dom';


import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Spinner from '../shared/Spinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if (loading) {
        return <Spinner></Spinner>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;