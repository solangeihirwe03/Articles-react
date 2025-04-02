import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoutes: React.FC= ()=>{
    const {isAuthenticated} = useAuth();
    const location = useLocation();
    return isAuthenticated ? <Outlet/> :<Navigate to={"/login"} state={{from: location}} replace/> 
}

export default ProtectedRoutes