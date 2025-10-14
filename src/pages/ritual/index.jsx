
import React, { useState, useRef } from 'react';
import './style.css';
import ritualData from '../../ritual_indice_conteudo_final.json';
import { useAuth } from '../../AuthContext';

function Ritual() {
  const { usuario } = useAuth();
  const [selected, setSelected] = useState(ritualData.capitulos[0]?.id || null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [contrast, setContrast] = useState(false);
  const menuRef = useRef(null);

  const handleSelect = (id) => {
    setSelected(id);
    setMenuOpen(false);
  };
  const handleKeyDown = (e, idx) => {
    if (!menuRef.current) return;
    const items = menuRef.current.querySelectorAll('.ritual-menu-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx < items.length - 1) items[idx + 1].focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx > 0) items[idx - 1].focus();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      items[idx].click();
    }
  };
  const selectedCap = ritualData.capitulos.find(c => c.id === selected);
  // Marcador de texto elegante
  const Marker = ({active}) => (
    <span
      className={`ritual-marker${active ? ' marker-active' : ''}`}
      aria-hidden="true"
      style={{display:'inline-block',verticalAlign:'middle',marginRight:12,width:14,height:14}}
    >
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="7" cy="7" r="6" fill={active ? '#bfa13a' : '#ffe600'} stroke="#bfa13a" strokeWidth="2" />
      </svg>
    </span>
  );

  // Detecta se menu está recolhido
  const isCollapsed = menuRef.current?.classList.contains('collapsed');

  // Navegação anterior/próximo capítulo
  const capIdx = ritualData.capitulos.findIndex(c => c.id === selected);
  const prevCap = capIdx > 0 ? ritualData.capitulos[capIdx - 1] : null;
  const nextCap = capIdx < ritualData.capitulos.length - 1 ? ritualData.capitulos[capIdx + 1] : null;

  return (
    <div className={`ritual-layout${contrast ? ' ritual-contrast' : ''}`}> 
      {/* Botão de abrir menu (mobile) */}
      <button className="ritual-menu-toggle" aria-label="Abrir menu" tabIndex={0} onClick={() => setMenuOpen(m => !m)}>
        ☰
      </button>
      {/* Botão de configuração flutuante */}
      <button className="ritual-config-btn" aria-label="Configurações do Ritual" onClick={() => setShowConfig(v => !v)}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.66 0 1.26.39 1.51 1H21a2 2 0 0 1 0 4h-.09c-.66 0-1.26.39-1.51 1z"/></svg>
      </button>
      {showConfig && (
        <div className="ritual-config-menu ritual-config-menu-center">
          <button onClick={() => window.location.href='/loja'} className="ritual-voltar-btn-modal">Voltar à Loja</button>
          <button onClick={() => setFontSize(f => Math.min(f + 0.1, 2))}>A+</button>
          <button onClick={() => setFontSize(f => Math.max(f - 0.1, 0.7))}>A-</button>
          <button onClick={() => setContrast(c => !c)}>{contrast ? 'Contraste normal' : 'Alto contraste'}</button>
        </div>
      )}
      {/* Menu drawer lateral */}
      <aside className={`ritual-menu${menuOpen ? ' open' : ''}`} ref={menuRef} aria-label="Capítulos do Ritual">
        <ul className={'ul-ritual'}>
          {ritualData.capitulos.map((cap, idx) => {
            const active = selected === cap.id;
            return (
              <li key={cap.id}>
                <button
                  className={`ritual-menu-item${active ? ' selected' : ''}`}
                  tabIndex={0}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => handleSelect(cap.id)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                >
                  <Marker active={active} />
                  <span className="ritual-menu-title">{cap.titulo}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="ritual-content" style={{ fontSize: `${fontSize}em` }}>
        {/* Exibe nome do usuário autenticado, se houver */}
        {usuario && (
          <div className="ritual-usuario-logado">
            Irmão: {usuario.nome} <span style={{fontSize:12, color:'#bfa13a'}}>({usuario.Grau})</span>
          </div>
        )}
        <div className="ritual-content-box">
          {selectedCap && (
            <h2 className="ritual-content-title" style={{textAlign:'center', fontWeight:700, fontSize:'1.6em', marginBottom:18, color:'#bfa13a'}}>{selectedCap.titulo}</h2>
          )}
          <article
            className="ritual-article"
            tabIndex={0}
            aria-label={selectedCap?.titulo}
            dangerouslySetInnerHTML={{ __html: selectedCap?.conteudo || '<p>Selecione um capítulo.</p>' }}
          />
          {selectedCap && (
            <div className="ritual-content-footer" style={{textAlign:'center', marginTop:32, color:'#bfa13a', fontWeight:600, fontSize:'1.1em', letterSpacing:1}}>
              Página {selectedCap.id}
            </div>
          )}
        </div>
        {/* Navegação anterior/próximo capítulo */}
        <div className="ritual-nav-btns">
          <button onClick={() => prevCap && setSelected(prevCap.id)} disabled={!prevCap}>&larr; Anterior</button>
          <button onClick={() => nextCap && setSelected(nextCap.id)} disabled={!nextCap}>Próximo &rarr;</button>
        </div>
      </main>
    </div>
  );
}

export default Ritual;
