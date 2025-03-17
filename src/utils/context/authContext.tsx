import React, {createContext, useContext, useState, ReactNode} from "react";

interface AuthContextType {
    isAuthenticated: boolean
    login: (token: string)=> void;
    logout: ()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

    const login = (newToken: string)=>{
        localStorage.setItem("token", newToken);
        setIsAuthenticated(true)
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = (): AuthContextType=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}