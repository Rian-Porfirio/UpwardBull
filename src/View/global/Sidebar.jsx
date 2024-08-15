import { IoIosHelpCircleOutline } from "react-icons/io";
import {Sidebar, Menu, MenuItem} from "react-pro-sidebar"
import { RiContactsBook3Fill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SidebarLayout(){
    return(
        <Sidebar className="h-screen text-black text-sm">
            <div className="text-center mb-5">
                <div className="flex items-center justify-between p-4">
                    <h1>Gerente</h1>
                    <div className="flex gap-3">
                        <Link to="/info"><IoIosHelpCircleOutline style={{width:18, height:18}} title="Info"/></Link>
                        <button onClick={() => alert("Not implemented")}>{<MdLogout title="Logout"/>}</button>
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-24 rounded-full mb-3">
                        <figure className="h-full">
                            <img src={"./images/CloseWindows.jpeg"} />
                        </figure>
                    </div>
                </div>
                <div>
                    <h2>Linus Torvalds</h2>
                </div>
            </div>
            <Menu>
                <MenuItem icon={<FaHouse />} component={<Link to="/" />}>Home</MenuItem>
                <MenuItem icon={<AiFillProduct />} component={<Link to="products" />}>Products</MenuItem>
                <MenuItem icon={<RiContactsBook3Fill />} component={<Link to="contacts" />}>Contacts</MenuItem>
                <MenuItem icon={<FaBuilding />} component={<Link to="providers" />}>Providers</MenuItem>
            </Menu>
        </Sidebar>
    )
}