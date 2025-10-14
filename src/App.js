import React from 'react';
import AppRoutes from './routes';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
