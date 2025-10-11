import React, { useState } from 'react';
import usuarios from '../../usuarios.json';
import './style.css';

function Login({ onLogin }) {
  const [cim, setCim] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === 'xxx') {
      let user = null;
      if (cim) {
        user = usuarios.find(u => u.CIM && u.CIM === cim);
      }
      onLogin({
        logged: true,
        usuario: user || null,
        cim: cim || null
      });
    } else {
      setError('Palavra Passe incorreta.');
    }
  };

  return (
    <main className="inicio-container">
      <h1>Login</h1>
      <form className="contact-form" onSubmit={handleLogin} style={{maxWidth: 340}}>
        <label>
          CIM (opcional)
          <input type="number" value={cim} onChange={e => setCim(e.target.value)} placeholder="Seu CIM" />
        </label>
        <label>
          Palavra Passe <span style={{color: 'red'}}>*</span>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} required placeholder="Digite a palavra passe" />
        </label>
        {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
        <button type="submit" className="btn-primary">Entrar</button>
      </form>
    </main>
  );
}

export default Login;
