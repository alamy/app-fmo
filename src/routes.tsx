import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Loja from './pages/loja';
import Recibo from './pages/recibo';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<Inicio />} />
  <Route path="/recibo" element={<Recibo />} />
  <Route path="/loja" element={<Loja />} />
  {/* Outras rotas podem ser adicionadas aqui */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
