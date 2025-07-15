import React from 'react';
import useRole from "../hooks/useRole"
import Spinner from '../components/Spinner/Spinner';
import { Navigate } from 'react-router';

const AdminRoutes = ({children}) => {
    const {role,isRoleLoading} = useRole();

    if(isRoleLoading) return <Spinner/>
    if(role === "admin"){
        return children
    }
    return <Navigate to="/" replace />;
};

export default AdminRoutes;