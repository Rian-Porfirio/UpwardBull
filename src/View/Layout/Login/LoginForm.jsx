import Button from "../../Components/Button"
import InputForm from "./InputForm";
import Logo from "../../Components/Logo";

function LoginForm(){
    return(
        <div className="m-auto bg-white w-96 h-72 p-6 rounded-sm shadow">
            <div className="flex flex-col h-full p-1">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="h-full mt-4">
                    <form>
                        <InputForm name="E-mail" instruction="Type your e-mail"/>
                            <div className="pt-8">
                                <Button action="Continue"/>
                            </div>
                    </form>
                </div>
                <div className="flex flex-col text-center text-black text-[10px]">
                    <span>Create Account</span>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;