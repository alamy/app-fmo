import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      {/* Outras rotas podem ser adicionadas aqui */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
