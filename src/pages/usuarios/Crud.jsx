import React, { useState, useEffect } from 'react';
import './style.css';
import usuarioService from '../../services/usuarioService';

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nome: '', CIM: '', Grau: '', celular: '', senha: '' });
  const [editId, setEditId] = useState(null);
  const [modalUser, setModalUser] = useState(null);
  const [modalSenha, setModalSenha] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    usuarioService.getAll()
      .then(res => setUsuarios(res.data))
      .catch(() => setUsuarios([]));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const action = editId
      ? usuarioService.update(editId, form)
      : usuarioService.create(form);
    action
      .then(() => {
        setForm({ nome: '', CIM: '', Grau: '', celular: '', senha: '' });
        setEditId(null);
        usuarioService.getAll()
          .then(res => setUsuarios(res.data));
      });
  }

  function handleEdit(u) {
    usuarioService.getById(u.id)
      .then(res => {
        setForm({
          nome: res.data.nome,
          CIM: res.data.CIM,
          Grau: res.data.Grau,
          celular: res.data.celular,
          senha: res.data.senha || ''
        });
        setEditId(u.id);
      });
  }

  function handleView(u) {
    setModalLoading(true);
    usuarioService.getById(u.id)
      .then(res => {
        setModalUser(res.data);
        setModalSenha(res.data.senha || '');
      })
      .finally(() => setModalLoading(false));
  }

  function handleModalClose() {
    setModalUser(null);
    setModalSenha('');
    setModalLoading(false);
  }

  function handleModalSenhaChange(e) {
    setModalSenha(e.target.value);
  }

  function handleModalSenhaSave() {
    if (!modalUser) return;
    setModalLoading(true);
    usuarioService.update(modalUser.id, { ...modalUser, senha: modalSenha })
      .then(() => {
        setModalUser({ ...modalUser, senha: modalSenha });
        usuarioService.getAll().then(res => setUsuarios(res.data));
      })
      .finally(() => setModalLoading(false));
  }

  function handleDelete(id) {
    usuarioService.delete(id)
      .then(() => usuarioService.getAll().then(res => setUsuarios(res.data)));
  }

  return (
    <div className="container-usuarios">
      <h2>CRUD de Usuários</h2>
      <form className="form-usuarios" onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm(f => ({...f, nome: e.target.value}))} required />
        <input placeholder="CIM (matrícula)" type="number" value={form.CIM} onChange={e => setForm(f => ({...f, CIM: e.target.value.replace(/\D/g, '')}))} required />
        <select value={form.Grau} onChange={e => setForm(f => ({...f, Grau: e.target.value}))} required>
          <option value="">Selecione o Grau</option>
          <option value="Aprendiz">Aprendiz</option>
          <option value="Companheiro">Companheiro</option>
          <option value="Mestre">Mestre</option>
        </select>
        <input placeholder="Celular" value={form.celular} onChange={e => setForm(f => ({...f, celular: e.target.value}))} />
        <input placeholder="Senha" type="password" value={form.senha} onChange={e => setForm(f => ({...f, senha: e.target.value}))} required />
        <button type="submit">{editId ? 'Atualizar' : 'Criar'}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({ nome: '', CIM: '', Grau: '', celular: '', senha: '' });}}>Cancelar</button>}
      </form>
      <table className="table-usuarios">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CIM</th>
            <th>Grau</th>
            <th>Celular</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.CIM}</td>
              <td>{u.Grau}</td>
              <td>{u.celular}</td>
              <td>
                <button onClick={()=>handleView(u)}>Visualizar</button>
                <button onClick={()=>handleEdit(u)}>Editar</button>
                <button onClick={()=>handleDelete(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal de visualização do usuário */}
      {modalUser && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'#0008',display:'flex',alignItems:'center',justifyContent:'center',zIndex:999}}>
          <div style={{background:'#fff',borderRadius:12,padding:32,minWidth:320,maxWidth:400,boxShadow:'0 2px 12px #0002',position:'relative'}}>
            <button onClick={handleModalClose} style={{position:'absolute',top:12,right:12,fontSize:18,border:'none',background:'none',cursor:'pointer'}}>×</button>
            <h3 style={{marginBottom:16}}>Dados do Usuário</h3>
            {modalLoading ? (
              <div>Carregando...</div>
            ) : (
              <>
                <div><b>Nome:</b> {modalUser.nome}</div>
                <div><b>CIM:</b> {modalUser.CIM}</div>
                <div><b>Grau:</b> {modalUser.Grau}</div>
                <div><b>Celular:</b> {modalUser.celular}</div>
                <div style={{marginTop:16}}>
                  <b>Senha:</b>
                  <input type="password" value={modalSenha} onChange={handleModalSenhaChange} style={{marginLeft:8,padding:4,borderRadius:6,border:'1px solid #ccc'}} />
                  <button onClick={handleModalSenhaSave} style={{marginLeft:8,padding:'4px 12px',borderRadius:6,border:'none',background:'#1877f2',color:'#fff',fontWeight:600}}>Salvar Senha</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosPage;
