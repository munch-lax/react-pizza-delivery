import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'
const CheckRole = (props) => {
    const user = useSelector((state) => state?.comman?.user)
    console.log(user, props.user)
    return (

        user ? user.isSeller ? <Outlet /> : <Navigate to="/pizzas" /> : null
    )
}


export default CheckRole