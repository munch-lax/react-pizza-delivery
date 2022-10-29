import { Outlet } from "react-router-dom"

const Layout = (props) => {
    return <div className="App">

        <Outlet />
    </div>
}

export default Layout