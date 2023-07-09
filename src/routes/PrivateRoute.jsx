/* eslint-disable react/prop-types */

import { Navigate, useLocation } from 'react-router-dom';


import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

import FullPageSpinner from '../shared/FullPageSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if (loading) {
        return <FullPageSpinner></FullPageSpinner>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;