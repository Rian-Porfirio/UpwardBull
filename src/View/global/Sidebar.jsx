import { IoIosHelpCircleOutline } from "react-icons/io";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { RiContactsBook3Fill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { userLogOut } from "../../model/services/auth/AuthService";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userLogOut();
    navigate("/login");
  };

  return (
    <Sidebar className="h-screen text-black text-sm">
      <div className="text-center mb-5">
        <div className="flex items-center justify-between p-4">
          <h1>{user?.isAdmin ? "Admin" : "User"}</h1>
          <div className="flex gap-3">
            <Link to="/info">
              <IoIosHelpCircleOutline style={{ width: 18, height: 18 }} title="Info" />
            </Link>
            <button onClick={handleLogout}>
              <MdLogout title="Logout" />
            </button>
          </div>
        </div>
        <div className="avatar">
          <div className="w-24 rounded-full mb-3">
            <figure className="h-full">
              <img src={"./images/CloseWindows.jpeg"} alt="Avatar" />
            </figure>
          </div>
        </div>
        <div>
          <h2>{user?.email || "Unknown User"}</h2>
        </div>
      </div>
      <Menu>
        <MenuItem icon={<FaHouse />} component={<Link to="/" />}>Home</MenuItem>
        <MenuItem icon={<AiFillProduct />} component={<Link to="products" />}>Products</MenuItem>
        <MenuItem icon={<RiContactsBook3Fill />} component={<Link to="contacts" />}>Contacts</MenuItem>
        <MenuItem icon={<FaBuilding />} component={<Link to="providers" />}>Providers</MenuItem>
        
        {user?.isAdmin && (
          <MenuItem icon={<FaUser />} component={<Link to="users" />}>Users</MenuItem>
        )}
      </Menu>
    </Sidebar>
  );
}
