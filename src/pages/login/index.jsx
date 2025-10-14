
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarios from '../../usuarios.json';
import './style.css';
import logo from '../../assets/fmo.png';
import sala from '../../assets/bg-img.jpg';


function Login({ onLogin }) {
  const [cim, setCim] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      navigate('/loja');
    } else {
      setError('🦴💀 Palavra Passe INCORRETA! Você despertou a fúria dos antigos! 💀🦴');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Willkommen</h1>
        <form onSubmit={handleLogin} className="login-form">
          <label>CIM (opcional)
            <input
              type="number"
              value={cim}
              onChange={e => setCim(e.target.value)}
              placeholder="CIM (opcional)"
              className="login-input"
            />
          </label>
          <label>Palavra-passe
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              required
              placeholder="Digite a palavra secreta"
              className="login-input"
            />
          </label>
          {error && <div className="login-error" style={{background:'#2d0000', color:'#fff', border:'2px solid #ff2222', borderRadius:10, padding:'16px 10px', fontWeight:700, fontSize:'1.2rem', textAlign:'center', marginBottom:8, boxShadow:'0 2px 12px #9008'}}>
            <span style={{fontSize:'2.2rem', display:'block', marginBottom:6}}>💀</span>
            {error}
          </div>}
          <button type="submit" className="login-btn">Wer ist da?</button>
        </form>
        <img src={sala} alt="Sala Maçônica" className="login-img" />
        <div className="login-copyright">&copy; 2017-2025</div>
      </div>
    </div>
  );
}

export default Login;
