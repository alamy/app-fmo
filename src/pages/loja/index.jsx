import React, { useState } from 'react';
import './style.css';


function Loja() {
  const [cim, setCim] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [logged, setLogged] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === 'xxx') {
      setLogged(true);
      setError('');
    } else {
      setError('Palavra Passe incorreta.');
    }
  };

  if (!logged) {
    return (
      <main className="inicio-container">
        <h1>Login da Loja</h1>
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

  // Área interna da Loja - layout tipo rede social
  return (
    <div className="loja-social-layout">
      {/* Topbar */}
      <header className="loja-topbar">
        <div className="loja-logo">Loja Nº 43</div>
        <div className="loja-user">Usuário logado</div>
      </header>
      <div className="loja-main-content">
        {/* Sidebar */}
        <nav className="loja-sidebar">
          <ul>
            <li><a href="/inicio">Início</a></li>
            <li><a href="/loja" className="active">Loja</a></li>
            <li><a href="/ritual">Ritual</a></li>
            <li><a href="/secretaria">Secretaria</a></li>
          </ul>
        </nav>
        {/* Feed */}
        <section className="loja-feed">
          <div className="loja-feed-header">Feed da Loja</div>
          <div className="loja-post">
            <div className="loja-post-author">Venerável Mestre</div>
            <div className="loja-post-content">Bem-vindos à nossa rede social interna! Compartilhe novidades, eventos e mensagens com os irmãos.</div>
            <div className="loja-post-date">há 2 horas</div>
          </div>
          <div className="loja-post">
            <div className="loja-post-author">Secretaria</div>
            <div className="loja-post-content">Reunião extraordinária nesta sexta-feira às 20h. Confirme presença!</div>
            <div className="loja-post-date">há 1 dia</div>
          </div>
          <div className="loja-post">
            <div className="loja-post-author">Irmão Silva</div>
            <div className="loja-post-content">Parabéns aos iniciados do último mês! 👏</div>
            <div className="loja-post-date">há 3 dias</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Loja;
