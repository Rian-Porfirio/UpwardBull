import UserDataContainer from "./UsersDataTable";

export default function Users(){
    return (
        <div className="p-3 w-full">
            <div className="w-full h-full bg-white p-2">
                <div>
                    <p className="text-3xl text-black">Users</p>
                </div>
                <div className="text-black h-96 mt-6 text-xl">
                    <UserDataContainer />
                </div>
            </div>
        </div>
    );
}