import Sidebar from "../../global/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainScreen(){
    return(
        <div className="flex h-screen">
            <Sidebar />
            <Outlet />
        </div>
    )
}