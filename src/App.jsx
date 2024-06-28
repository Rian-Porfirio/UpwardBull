import {Routes, Route} from "react-router-dom";
import ProvidersPage from "./view/pages/providersP/ProvidersPage";
import ProductsPage from "./view/pages/products/ProductsPage";
import ContactsPage from "./view/pages/contacts/ContactsPage";
import RegisterPage from "./view/pages/register/RegisterPage";
import NoRoutePage from "./view/pages/NoRoutePage";
import MainScreen from "./view/layout/MainScreen";
import LoginPage from "./view/pages/login/LoginPage";
import HomePage from "./view/pages/home/HomePage";


function App() {
  return (

      <Routes>
              <Route path="/" element={<MainScreen />}> 
              
              <Route index element={<HomePage />} />
              <Route path="*" element={<NoRoutePage />} />

              <Route path="products" element={<ProductsPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="providers" element={<ProvidersPage />} />

            </Route>

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
      </Routes>
  );
}

export default App;