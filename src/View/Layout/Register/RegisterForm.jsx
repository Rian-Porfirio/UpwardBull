import { userRegister } from "../../../model/services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { useError } from "../../../hooks/useError";
import { useState } from "react";
import InputForm from "../login/InputForm";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [emailText, setEmailText] = useState("");
  const [password, setPassword] = useState("");
  const [isClickable, setIsClickable] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, showError } = useError();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const email = event.target.value;
    setEmailText(email);
    validateEmail(email);
  };

  const validateEmail = (email) => {
    const validation = /^[^@\s]+@(\w+\.)+\w+$/;
    setIsClickable(validation.test(email));
  };

  async function handleRegister(e) {
    e.preventDefault();
    showError(""); 

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      const response = await userRegister(emailText, password);
      if (response.error) {
        showError(response.error);
        return;
      }
    
      toast.success("Successfully Registered");
      navigate("/login");
    } catch (error) {
      
      showError("An error occurred during registration. Please try again.");
      toast.error("An error occurred during registration.");
    }
  }

  return (
    <div className={`m-auto bg-white w-[420px] h-fit rounded-sm shadow`}>
      <div className="h-full p-12">
        <div className="flex flex-col h-full p-1">
          <div className="mx-auto">
            <img src={"/images/UpwardBullLogo.png"} alt="Upward Bull Logo" />
          </div>
          <div className="h-full">
            <form>
              <InputForm
                name="E-mail"
                value={emailText}
                onChange={handleChange}
                instruction="Type your email"
              />
              <InputForm
                value={password}
                name="Password"
                type="password"
                instruction="Type your password"
                onChange={(p) => setPassword(p.target.value)}
              />
              <InputForm
                value={confirmPassword}
                name="Confirm Password"
                type="password"
                instruction="Confirm your password"
                onChange={(p) => setConfirmPassword(p.target.value)}
              />
              {error && <p className="text-error text-sm pb-3">{error}</p>}
              <div className="flex gap-6 pt-6">
                <Button action="Register" onClick={handleRegister} disabled={!isClickable} />
              </div>
            </form>
          </div>
          <div className="mx-auto text-black text-xs mt-2">
            <Link to="/Login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
