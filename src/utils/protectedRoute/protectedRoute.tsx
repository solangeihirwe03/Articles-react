import React, { ReactNode } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface ProtectedRouteProps {
    children: ReactNode;
  }

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ()=>{
    const {isAuthenticated} = useAuth();
    const location = useLocation();
    return isAuthenticated ? <Outlet/> :<Navigate to={"/login"} state={{from: location}} replace/> 
}

export default ProtectedRoutes