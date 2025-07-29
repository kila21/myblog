import { Navigate, Outlet } from "react-router-dom"

import { useAppSelector } from "../store/hooks"

export const PrivateRoute = () =>{
    const isAuthenticated = useAppSelector(state => state.auth.user)

    return isAuthenticated ? <Outlet /> : <Navigate to='/'/>
}