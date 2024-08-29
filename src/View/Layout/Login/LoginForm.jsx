import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../model/services/auth/AuthService";
import { useError } from "../../../hooks/useError";
import InputForm from "./InputForm";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [emailText, setEmailText] = useState("");
    const [password, setPassword] = useState("");
    const [isClickable, setIsClickable] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const { error, showError } = useError();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const email = event.target.value;
        setEmailText(email);
        validateEmail(email);
    }

    const validateEmail = (email) => {
        const validation = /^[^@\s]+@(\w+\.)+\w+$/;
        setIsClickable(validation.test(email));
    }

    const handleNextInput = (event) => {
        event.preventDefault();
        setShowInput(true);
    }

    async function handleLogin(e) {
        e.preventDefault();
        showError("");
        try {
            const response = await userLogin(emailText, password);

            if (response.error) {
                toast.error(response.error);
                return;
            }

            if (response.isBlocked) {
                toast.error("You`re Blocked.");
                return;
            }

            toast.success("Login successful");
            navigate('/');
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <div className={`m-auto bg-white w-[420px] h-fit rounded-sm shadow`}>
            <div className="h-full p-12">
                <div className="flex flex-col h-full p-1">
                    <div className="mx-auto mb-6">
                        <img src={"/images/UpwardBullLogo.png"} alt="Upward Bull Logo" />
                    </div>
                    <div className="h-full">
                        <form>
                            <InputForm name="E-mail" value={emailText} onChange={handleChange} instruction="Type your e-mail" />
                            {showInput && (
                                <InputForm value={password} name="Password" type="password" instruction="Type your password" onChange={(p) => setPassword(p.target.value)} />
                            )}
                            {error && <p className="text-error text-sm pb-3">{error}</p>}
                            <div className="flex gap-6 pt-6">
                                {showInput && (
                                    <>
                                        <Button action="Back" />
                                        <Button action="Login" onClick={handleLogin} />
                                    </>
                                )}
                                {!showInput && <Button action="Continue" disabled={!isClickable} onClick={handleNextInput} />}
                            </div>
                        </form>
                    </div>
                    <div className="mx-auto text-black text-xs mt-2">
                        <Link to="/Register">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
