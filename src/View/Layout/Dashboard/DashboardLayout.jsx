import Options from "./MenuOptions"

export default function DashBoardLayout(){
    return (
        <div className="h-screen bg-[#0a6390] w-72">
            <div className="h-fit text-center">
                <h1>Admin</h1>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                     </div>
                </div>
            </div>
                <div className="flex flex-col">
                    <Options path="/" name="Home"/>
                    <Options path="/quotes" name="Quotes"/>
                    <Options path="/products" name="Products"/>
                    <Options path="/providers" name="Providers"/>
                </div>
        </div>
    )
}