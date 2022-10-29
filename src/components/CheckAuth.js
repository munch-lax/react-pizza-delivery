import { useLocation, Navigate, Outlet } from "react-router-dom"

const CheckAuth = (props) => {
    const token = localStorage.getItem('localToken')
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default CheckAuth