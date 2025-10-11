import React from 'react';
import { useAuth } from '../AuthContext';
import './Header.css';

function Header() {
  const { usuario, logout } = useAuth();
  return (
    <header className="loja-topbar">
      <div className="loja-logo">Loja Nº 43</div>
      <div className="loja-user">
        {usuario ? (
          <>
            Usuário: <span style={{color:'#4267b2', fontWeight:'bold'}}>{usuario.nome}</span> <span style={{fontSize:12, color:'#bfa13a'}}>({usuario.Grau})</span>
          </>
        ) : (
          'Usuário logado'
        )}
      </div>
      <button onClick={logout} className="btn-secondary" style={{marginLeft:16}}>Sair</button>
    </header>
  );
}

export default Header;
