import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio/index.jsx';
import Loja from './pages/loja/index.jsx';
import Ritual from './pages/ritual/index.jsx';
import Secretaria from './pages/secretaria/index.jsx';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/loja" element={<Loja />} />
      <Route path="/ritual" element={<Ritual />} />
      <Route path="/secretaria" element={<Secretaria />} />
      {/* Redireciona / para /inicio */}
      <Route path="/" element={<Inicio />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;