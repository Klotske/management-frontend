import { Outlet } from "react-router-dom"
import Topbar from "../components/Topbar"

const Layout = () => {
    return(
        <div className="relative flex flex-col w-full h-full min-h-screen">
            <Topbar />
            <div className="relative flex flex-1 w-full justify-center items-center">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout