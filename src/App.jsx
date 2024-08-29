import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from './hooks/useAuth';
import ProvidersPage from "./view/pages/providersP/ProvidersPage";
import ProductsPage from "./view/pages/products/ProductsPage";
import ContactsPage from "./view/pages/contacts/ContactsPage";
import RegisterPage from "./view/pages/register/RegisterPage";
import Info from "./view/pages/information/Info";
import NoRoutePage from "./view/pages/NoRoutePage";
import MainScreen from "./view/layout/MainScreen";
import LoginPage from "./view/pages/login/LoginPage";
import HomePage from "./view/pages/home/HomePage";
import ProtectedRoute from "./view/components/ProtectedPage";
import Users from "./view/pages/users/UserPage";

function App() {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]); 

  return (
    <Routes>
      <Route path="/" element={<MainScreen />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="contacts"
          element={
            <ProtectedRoute>
              <ContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="providers"
          element={
            <ProtectedRoute>
              <ProvidersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="info"
          element={
            <ProtectedRoute>
              <Info />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NoRoutePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
