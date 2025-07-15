import React from "react";
import Spinner from "../components/Spinner/Spinner";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
const PrivateRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation()

    if (loading) return <Spinner/>;
    if(!user){
        return <Navigate to="/login" state={{from:location}} replace/>
    }
    return children;
};

export default PrivateRoute;
