import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Inicio from './pages/inicio/index.jsx';
import Loja from './pages/loja/index.jsx';
import Ritual from './pages/ritual/index.jsx';
import Secretaria from './pages/secretaria/index.jsx';
import Recibo from './pages/recibo/index.jsx';
import Login from './pages/login/index.jsx';
import { useAuth } from './AuthContext';

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.logged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/loja" element={
        <RequireAuth>
          <Loja />
        </RequireAuth>
      } />
      <Route path="/ritual" element={
        <RequireAuth>
          <Ritual />
        </RequireAuth>
      } />
      <Route path="/secretaria" element={
        <RequireAuth>
          <Secretaria />
        </RequireAuth>
      } />
  <Route path="/recibo" element={<Recibo />} />
  {/* Redireciona / para /inicio */}
  <Route path="/" element={<Inicio />} />
    </Routes>
  </BrowserRouter>
);

// Wrapper para passar onLogin para Login
function LoginWrapper() {
  const auth = useAuth();
  const location = useLocation();
  const handleLogin = (data) => {
    auth.login(data);
    // Redireciona para rota anterior ou /inicio
    const from = location.state?.from?.pathname || '/inicio';
    window.location.replace(from);
  };
  return <Login onLogin={handleLogin} />;
}

export default AppRoutes;