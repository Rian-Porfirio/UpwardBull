import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./View/Pages/LoginPage"
function App(){
  return(
    <Router>
      <Routes>
        <Route index path="/" element={<LoginPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;