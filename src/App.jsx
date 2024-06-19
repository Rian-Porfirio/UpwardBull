import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./View/Pages/LoginPage"
import RegisterPage from "./View/Pages/RegisterPage"
function App(){
  return(
    <Router>
      <Routes>
        <Route index path="/Login" element={<LoginPage />} /> 
        <Route path="/Register" element={<RegisterPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;