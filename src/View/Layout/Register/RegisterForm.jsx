import Button from "../../Components/Button"
import InputForm from "../../Components/InputForm";
import {userRegister} from "../../../Context/AuthContext"
import {useError} from "../../../Hooks/useError"
import {useState} from "react";

function LoginForm(){
    const [emailText, setEmailText] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

    async function handleRegister(e){
        e.preventDefault();
        showError("");

        if(password !== confirmPassword){
            showError("passwords doesn't match")
            return;
        }

        const response = await userRegister(emailText, password);

        if(response.error){
            showError(response.error)
            return;
        }

        alert("Conta registrada");
    }

    return(
        <div className={`m-auto bg-white w-[420px] h-fit rounded-sm shadow`}>
            <div className="h-full p-12">
                <div className="flex flex-col h-full p-1">
                    <div className="mx-auto">
                        <img src={"/images/UpwardBullLogo.png"} />
                    </div>
                    <div className="h-full">
                        <form>

                            <InputForm name="E-mail" value={emailText} onChange={handleChange} instruction="Type your e-mail"/>

                            <InputForm value={password} name="Password" type="password" instruction="Type your password" onChange={(p) => setPassword(p.target.value)}/>

                            <InputForm value={confirmPassword} name="Confirm Password" type="password" instruction="confirm your password" onChange={(p) => setConfirmPassword(p.target.value)}  />

                            {error && <p className="text-error text-sm pb-3">{error}</p>}
                                <div className="flex gap-6 pt-6npnp">
                                    <Button action="Continue" onClick={handleRegister}/>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;