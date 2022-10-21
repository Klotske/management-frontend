import { Outlet } from "react-router-dom"
import Topbar from "../components/Topbar"

const Layout = () => {
    return(
        <div className="flex flex-col w-full h-full">
            <Topbar />
            <div className="flex flex-grow w-full items-center justify-center overflow-hidden p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout