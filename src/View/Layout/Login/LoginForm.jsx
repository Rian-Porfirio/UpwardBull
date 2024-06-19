import Button from "../../Components/Button"
import InputForm from "./InputForm";
import {userLogin} from "../../../Context/AuthContext"
import {useError} from "../../../Hooks/useError"
import {useState} from "react";

function LoginForm(){
    const [emailText, setEmailText] = useState("");
    const [password, setPassword] = useState("");
    const [isClickable, setIsClickable] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const {error, showError} = useError();

    const handleChange = (event) =>{
        const email = event.target.value;
        setEmailText(email);
        validateEmail(email);
    }

    const validateEmail = (email) =>{
        const validation = /^[^@\s]+@(\w+\.)+\w+$/;
        setIsClickable(validation.test(email));
    }

    const handleNextInput = (event) =>{
        console.log(import.meta.env.VITE_FIREBASE_API_KEY)
        event.preventDefault();
        setShowInput(true);
    }

    async function handleLogin(e){
        e.preventDefault();
        showError("");
        const response = await userLogin(emailText, password);

        if(response.error){
            showError(response.error)
            return;
        }

        alert("Login efetuado");
    }

    return(
        <div className={`m-auto bg-white w-[420px] h-${showInput ? "72" : "96"} rounded-sm shadow`}>
            <div className="h-full p-12">
                <div className="flex flex-col h-full p-1">
                    <div className="mx-auto mb-8">
                        <img src={"/images/UpwardBullLogo.png"} />
                    </div>
                    <div className="h-full">
                        <form>
                            <InputForm name="E-mail" value={emailText} onChange={handleChange} instruction="Type your e-mail"/>
                            {showInput && (
                                <InputForm value={password} name="Password" type="password" instruction="Type your password" onChange={(p) => setPassword(p.target.value)}/>
                            )}
                            {error && <p className="text-error text-sm pb-3">{error}</p>}
                                <div className="flex gap-6 pt-6npnp">
                                    {showInput && (
                                        <>
                                        <Button action="Back" />
                                        <Button action="Login" onClick={handleLogin} />
                                        </>
                                    )}
                                    {showInput == false && <Button action="Continue" disabled={!isClickable} onClick={handleNextInput}/>}
                                </div>
                        </form>
                    </div>
                    <div className="flex flex-col text-center text-black text-[10px] mt-2">
                        <span>Create Account</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;