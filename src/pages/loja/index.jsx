


import React, { useState } from 'react';
import './style.css';
import postsData from '../../post.json';
import Header from '../../component/Header';

function Loja() {
  const [posts, setPosts] = useState(postsData.slice().reverse()); // mais recente primeiro
  const [novoPost, setNovoPost] = useState('');
  const [postError, setPostError] = useState('');

  // Pega usuário do Header via contexto
  const podePostar = window.localStorage.getItem('usuario') !== null;
  // Função para adicionar novo post
  const usuario = JSON.parse(window.localStorage.getItem('usuario') || 'null');
  const handleNovoPost = (e) => {
    e.preventDefault();
    if (!novoPost.trim()) {
      setPostError('Digite uma mensagem.');
      return;
    }
    // Adiciona novo post ao topo
    const novo = {
      autor: usuario ? usuario.nome : 'Convidado',
      conteudo: novoPost,
      data: new Date().toISOString(),
    };
    setPosts([novo, ...posts]);
    setNovoPost('');
    setPostError('');
    // Aqui seria necessário salvar no backend/arquivo para persistência real
  };

  return (
    <div className="loja-social-layout">
      <Header />
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
          {posts.map((post, idx) => (
            <div className="loja-post" key={idx}>
              <div className="loja-post-author">{post.autor}</div>
              <div className="loja-post-content">{post.conteudo}</div>
              <div className="loja-post-date">{new Date(post.data).toLocaleString('pt-BR', {dateStyle:'short', timeStyle:'short'})}</div>
            </div>
          ))}
          {/* Caixa de novo post só para quem tem CIM */}
          {podePostar && (
            <form className="loja-novo-post" onSubmit={handleNovoPost} style={{marginTop:24}}>
              <textarea
                value={novoPost}
                onChange={e => setNovoPost(e.target.value)}
                placeholder="Escreva um comentário ou novidade..."
                style={{width:'100%', minHeight:60, borderRadius:6, border:'1px solid #ccc', padding:8}}
              />
              {postError && <div style={{color:'red', marginBottom:6}}>{postError}</div>}
              <button type="submit" className="btn-primary" style={{marginTop:6}}>Publicar</button>
            </form>
          )}
          {!podePostar && (
            <div style={{marginTop:24, color:'#888', fontSize:13, textAlign:'center'}}>Apenas membros autenticados podem publicar.</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Loja;
