


import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import './style.css';
import postsData from '../../post.json';
import Header from '../../component/Header';

function Loja() {
  const [posts, setPosts] = useState(postsData.slice().reverse()); // mais recente primeiro
  const [comentario, setComentario] = useState('');
  const [comentandoIdx, setComentandoIdx] = useState(null);
  const [novoPost, setNovoPost] = useState('');
  const [postError, setPostError] = useState('');
  const auth = useAuth();
  // Preferir contexto, mas fallback para localStorage
  let usuario = auth?.usuario;
  if (!usuario) {
    try {
      usuario = JSON.parse(window.localStorage.getItem('usuario') || 'null');
    } catch {}
  }
  const podePostar = usuario && ['1001','1002','1003'].includes(String(usuario.CIM));
  // Função para adicionar novo post
  const handleNovoPost = (e) => {
    e.preventDefault();
    if (!novoPost.trim()) {
      setPostError('Digite uma mensagem.');
      return;
    }
    if (novoPost.length > 600) {
      setPostError('O post deve ter no máximo 600 caracteres.');
      return;
    }
    // Adiciona novo post ao topo
    const novo = {
      autor: usuario ? usuario.nome : 'Convidado',
      conteudo: novoPost,
      data: new Date().toISOString(),
      cim: usuario ? usuario.CIM : undefined
    };
    setPosts([novo, ...posts]);
    setNovoPost('');
    setPostError('');
    // Aqui seria necessário salvar no backend/arquivo para persistência real
  };

  // Adiciona comentário a um post (apenas front-end)
  function handleComentar(idx) {
    if (!comentario.trim()) return;
    if (comentario.length > 600) return;
    const usuario = JSON.parse(window.localStorage.getItem('usuario') || 'null');
    const novoComentario = {
      autor: usuario ? usuario.nome : 'Convidado',
      data: new Date().toISOString(),
      texto: comentario
    };
    setPosts(posts => posts.map((p, i) => i === idx ? {
      ...p,
      comentarios: [...(p.comentarios || []), novoComentario]
    } : p));
    setComentario('');
    setComentandoIdx(null);
  }

  return (
    <div className="loja-social-layout">
      <Header />
      <div className="loja-main-content">
        {/* Sidebar */}
        <nav className="loja-sidebar">
          <ul>
            <li><a href="/loja" className="active">Loja</a></li>
            <li><a href="/ritual">Ritual</a></li>
            <li><a href="/secretaria">Secretaria</a></li>
          </ul>
        </nav>
        {/* Feed */}
        <section className="loja-feed">
          <div className="loja-feed-header">Feed da Loja</div>
          {posts.map((post, idx) => {
            const isGestor = ['1001','1002','1003'].includes(post.cim);
            return (
              <div
                className="loja-post"
                key={idx}
                style={isGestor ? {
                  background:'#ffeeba',
                  color:'#bfa13a',
                  fontWeight:'bold',
                  border:'1.5px solid #bfa13a'
                } : {}}
              >
                <div className="loja-post-author">{post.autor}</div>
                <div className="loja-post-content">{post.conteudo}</div>
                <div className="loja-post-date">{new Date(post.data).toLocaleString('pt-BR', {dateStyle:'short', timeStyle:'short'})}</div>
                {/* Comentários */}
                <div style={{marginTop:8, marginLeft:8}}>
                  {(post.comentarios || []).map((c, i) => (
                    <div key={i} style={{background:'#f7f7fa', borderRadius:6, padding:'6px 10px', marginBottom:4, fontSize:14}}>
                      <b>{c.autor}:</b> {c.texto} <span style={{color:'#888', fontSize:12}}>({new Date(c.data).toLocaleString('pt-BR', {dateStyle:'short', timeStyle:'short'})})</span>
                    </div>
                  ))}
                  {comentandoIdx === idx ? (
                    <form onSubmit={e => {e.preventDefault(); handleComentar(idx);}} style={{display:'flex', gap:6, marginTop:6}}>
                      <input
                        value={comentario}
                        onChange={e => {
                          if (e.target.value.length <= 600) setComentario(e.target.value);
                        }}
                        maxLength={600}
                        style={{flex:1, borderRadius:6, border:'1px solid #ccc', padding:'4px 8px'}}
                        placeholder="Comentar... (máx. 600 caracteres)"
                      />
                      <button type="submit" style={{background:'#1877f2', color:'#fff', border:'none', borderRadius:6, padding:'0 14px', fontWeight:600}}>Enviar</button>
                      <button type="button" onClick={()=>{setComentandoIdx(null); setComentario('');}} style={{background:'#ccc', color:'#222', border:'none', borderRadius:6, padding:'0 10px', fontWeight:600}}>Cancelar</button>
                    </form>
                  ) : (
                    <button onClick={()=>setComentandoIdx(idx)} style={{background:'#eee', color:'#1877f2', border:'none', borderRadius:6, padding:'2px 12px', fontWeight:600, fontSize:13, marginTop:4}}>Comentar</button>
                  )}
                </div>
              </div>
            );
          })}
          {/* Caixa de novo post só para quem tem CIM */}
          {podePostar && (
            <form className="loja-novo-post" onSubmit={handleNovoPost} style={{marginTop:24}}>
              <textarea
                value={novoPost}
                onChange={e => {
                  if (e.target.value.length <= 600) setNovoPost(e.target.value);
                }}
                maxLength={600}
                placeholder="Escreva um comentário ou novidade... (máx. 600 caracteres)"
                style={{width:'100%', minHeight:60, borderRadius:6, border:'1px solid #ccc', padding:8}}
              />
              <div style={{fontSize:12, color:'#888', textAlign:'right'}}>{novoPost.length}/600</div>
              {postError && <div style={{color:'red', marginBottom:6}}>{postError}</div>}
              <button type="submit" className="btn-primary" style={{marginTop:6}}>Publicar</button>
            </form>
          )}
          {!podePostar && (
            <div style={{marginTop:24, color:'#888', fontSize:13, textAlign:'center'}}>Apenas gestores podem publicar. Qualquer um pode comentar nos posts.</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Loja;
