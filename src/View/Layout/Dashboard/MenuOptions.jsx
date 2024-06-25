import { Link } from "react-router-dom"

export default function MenuOptions({path, name}){
    return (
        <div className="flex h-12 border-b-2 border-[#0f95e3] text-black items-center justify-center">
             <Link to={path}>{name}</Link>
        </div>
    )
}