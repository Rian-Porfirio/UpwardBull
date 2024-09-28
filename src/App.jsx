import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth }  from './hooks/useAuth';
import ProvidersPage from "./view/pages/providersP/ProvidersPage";
import ProductsPage from "./view/pages/products/ProductsPage";
import ContactsPage from "./view/pages/contacts/ContactsPage";
import RegisterPage from "./view/pages/register/RegisterPage";
import Info from "./view/pages/information/Info";
import NoRoutePage from "./view/pages/NoRoutePage";
import MainScreen from "./view/layout/mainScreen";
import LoginPage from "./view/pages/login/LoginPage";
import ProtectedRoute from "./view/components/ProtectedPage";
import Users from "./view/pages/users/UserPage";
import RequisitionsPage from "./view/pages/requisitons/RequisitionsPage";

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
        <Route
          path="requisitions"
          element={
            <ProtectedRoute>
              <RequisitionsPage />
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
