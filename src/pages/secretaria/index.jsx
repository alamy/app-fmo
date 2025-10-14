
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarios from '../../usuarios.json';
import { useAuth } from '../../AuthContext';
import Header from '../../component/Header';
import '../loja/style.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import mensalidadesJson from '../../mensalidades.json';
import mensalidadeService from '../../services/mensalidadeService';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Regras de caixa.js
const CUSTOS_FIXOS = { aluguel: 400, insumos: 180 };
function calcularCaixa(mensalidades) {
  return mensalidades.map(mes => {
    const qtdPagos = Array.isArray(mes.pagos) ? mes.pagos.length : 0;
    const receitas = qtdPagos * 120;
    const custos = CUSTOS_FIXOS.aluguel + CUSTOS_FIXOS.insumos;
    const saldo = receitas - custos;
    return {
      mes: mes.mes,
      ano: mes.ano,
      receitas,
      custos,
      saldo,
      pagos: mes.pagos,
      iregulares: mes.iregulares,
      tronco: mes.tronco
    };
  });
}

function Secretaria() {
  const navigate = useNavigate();
  const auth = useAuth();
  const isGestor = ["1001","1002","1003"].includes(auth?.cim);

  // Estado para edição do mês
  const [editMes, setEditMes] = useState(null);
  const [mensalidades, setMensalidades] = useState(mensalidadesJson);

  // Handler para marcar/desmarcar pagamento
  const [reciboCim, setReciboCim] = useState(null);
  function handleTogglePagamento(cim, checked) {
    setEditMes(prev => {
      if (!prev) return prev;
      const pagos = checked
        ? [...prev.pagos, cim]
        : prev.pagos.filter(c => c !== cim);
      return { ...prev, pagos };
    });
    if (checked) setReciboCim(cim);
    else setReciboCim(null);
  }

  // Handler para editar valor do tronco
  function handleTroncoChange(value) {
    setEditMes(prev => ({ ...prev, tronco: Number(value) }));
  }

  // Handler para salvar edição (agora usando o service)
  async function handleSalvarEdicao() {
    if (!editMes) return;
    // Garante que o próprio gestor (CIM) fique como pago e regular
    let novosPagos = editMes.pagos;
    let novosStatus = { ...editMes.statusUsuarios };
    if (auth?.cim && editMes.irmaos.includes(auth.cim)) {
      if (!novosPagos.includes(auth.cim)) novosPagos = [...novosPagos, auth.cim];
      novosStatus[auth.cim] = 'regular';
    }
    // Atualiza mensalidade no service
    const updateObj = { ...editMes, pagos: novosPagos, statusUsuarios: novosStatus };
    await mensalidadeService.update(editMes.mes, editMes.ano, updateObj);
    // Atualiza estado local
    const lista = await mensalidadeService.list();
    setMensalidades(lista);
    setEditMes(null);
  }

  function statusColor(status) {
    if (status === 'regular') return '#1877f2';
    if (status === 'irregular') return '#ff9800';
    if (status === 'adormecido') return '#b71c1c';
    return '#888';
  }
  const [caixa, setCaixa] = useState([]);
  const [meses, setMeses] = useState([]);
  const [ultimoTronco, setUltimoTronco] = useState(0);

  useEffect(() => {
    const c = calcularCaixa(mensalidades);
    setCaixa(c);
    setMeses(c.map(m => `${m.mes}/${m.ano}`));
    setUltimoTronco(mensalidades[mensalidades.length-1]?.tronco || 0);
  }, [mensalidades]);

  // Dados para gráfico de pizza (pagos x irregulares do último mês)
  const ultimo = mensalidades[mensalidades.length-1] || {};
  const pagos = Array.isArray(ultimo.pagos) ? ultimo.pagos.length : 0;
  const iregulares = Array.isArray(ultimo.iregulares) ? ultimo.iregulares.length : 0;
  const total = Array.isArray(ultimo.irmaos) ? ultimo.irmaos.length : 0;

  const pieData = {
    labels: ['Pagos', 'Irregulares'],
    datasets: [
      {
        data: [pagos, iregulares],
        backgroundColor: ['#1877f2', '#ccd0d5'], // Facebook blue, light gray
        borderColor: ['#4267b2', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  // Dados para gráfico de barras (saldo mês a mês)
  const barData = {
    labels: meses,
    datasets: [
      {
        label: 'Saldo Mensal',
        data: caixa.map(m => m.saldo),
        backgroundColor: '#1877f2', // Facebook blue
        borderColor: '#4267b2',
        borderWidth: 2,
      },
      {
        label: 'Tronco (Caixa Livre)',
        data: caixa.map(m => m.tronco),
        backgroundColor: '#ccd0d5', // Facebook light gray
        borderColor: '#4267b2',
        borderWidth: 2,
      }
    ],
  };

  // Filtros balancete
  const anos = Array.from(new Set(mensalidades.map(m => m.ano)));
  const [anoFiltro, setAnoFiltro] = useState(anos[anos.length-1]);
  const mesesFiltro = caixa.filter(m => m.ano === anoFiltro);
  const [mesFiltro, setMesFiltro] = useState('');
  const balancete = mesesFiltro.filter(m => !mesFiltro || m.mes === mesFiltro);


  // Handler para enviar recibo
  function handleEnviarRecibo(cim) {
    // Busca dados do usuário
    const user = usuarios.find(u => u.CIM === cim);
    // Redireciona para /recibo com state
    navigate('/recibo', { state: { nome: user?.nome || '', cim: user?.CIM || cim } });
    setReciboCim(null);
  }

  return (
    <div className="loja-social-layout">
      <Header />
      <div className="loja-main-content">
        <nav className="loja-sidebar">
          <ul>
            <li><a href="/loja">Loja</a></li>
            <li><a href="/ritual">Ritual</a></li>
            <li><a href="/secretaria" className="active">Secretaria</a></li>
          </ul>
        </nav>
        <main className="secretaria-dashboard">
          <section className="secretaria-balancete" style={{float:'right', width:'100%', maxWidth: '950px', marginRight:0}}>
            <h2>Balancete Anual da Loja</h2>
            <div style={{display:'flex', gap:16, justifyContent:'center', marginBottom:18, flexWrap:'wrap'}}>
              <label style={{color:'#4267b2', fontWeight:'bold'}}>Ano:
                <select value={anoFiltro} onChange={e => {setAnoFiltro(e.target.value); setMesFiltro('')}} style={{marginLeft:8, borderRadius:6, border:'1px solid #bfa13a', background:'#f7f7fa', color:'#222', padding:'2px 8px'}}>
                  {anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
                </select>
              </label>
              <label style={{color:'#4267b2', fontWeight:'bold'}}>Mês:
                <select value={mesFiltro} onChange={e => setMesFiltro(e.target.value)} style={{marginLeft:8, borderRadius:6, border:'1px solid #bfa13a', background:'#f7f7fa', color:'#222', padding:'2px 8px'}}>
                  <option value=''>Todos</option>
                  {mesesFiltro.map(m => <option key={m.mes} value={m.mes}>{m.mes}</option>)}
                </select>
              </label>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', background:'#f0f2f5', color:'#050505', fontFamily:'Segoe UI', fontSize:15, borderRadius:8, boxShadow:'0 1px 8px #0001'}}>
                <thead style={{background:'#4267b2', color:'#fff'}}>
                  <tr>
                    <th style={{padding:'8px 6px'}}>Mês</th>
                    <th style={{padding:'8px 6px'}}>Receitas</th>
                    <th style={{padding:'8px 6px'}}>Custos</th>
                    <th style={{padding:'8px 6px'}}>Saldo</th>
                    <th style={{padding:'8px 6px'}}>Tronco</th>
                    <th style={{padding:'8px 6px'}}>Pagos</th>
                    <th style={{padding:'8px 6px'}}>Irregulares</th>
                    {isGestor && <th style={{padding:'8px 6px'}}>Editar</th>}
                  </tr>
                </thead>
                <tbody>
                  {balancete.map((m, idx) => {
                    // Encontra o mês original para edição
                    const mesOrig = mensalidades.find(mm => mm.mes === m.mes && mm.ano === m.ano);
                    const isAberto = mesOrig && mesOrig.mesFechado === false;
                    return (
                      <tr key={m.mes} style={{background:'#fff'}}>
                        <td style={{padding:'6px 4px', textAlign:'center', color:'#4267b2', fontWeight:600}}>{m.mes}/{m.ano}</td>
                        <td style={{padding:'6px 4px', textAlign:'right'}}>R$ {m.receitas},00</td>
                        <td style={{padding:'6px 4px', textAlign:'right'}}>R$ {m.custos},00</td>
                        <td style={{padding:'6px 4px', textAlign:'right', color: m.saldo >= 0 ? '#1877f2' : '#ff4d4d', fontWeight:600}}>R$ {m.saldo},00</td>
                        <td style={{padding:'6px 4px', textAlign:'right'}}>
                          <>R$ {m.tronco},00</>
                        </td>
                        <td style={{padding:'6px 4px', textAlign:'center'}}>{Array.isArray(m.pagos) ? m.pagos.length : 0}</td>
                        <td style={{padding:'6px 4px', textAlign:'center'}}>{Array.isArray(m.iregulares) ? m.iregulares.length : 0}</td>
                        {isGestor && isAberto && (
                          <td style={{padding:'6px 4px', textAlign:'center'}}>
                            <button style={{background:'#1877f2', color:'#fff', border:'none', borderRadius:6, padding:'2px 10px', fontWeight:600, cursor:'pointer'}} onClick={() => setEditMes(mesOrig)}>Editar</button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Formulário de edição de pagamentos e tronco (abaixo da tabela) */}
          {isGestor && editMes && (
            <div style={{background:'#fff', borderRadius:12, padding:32, minWidth:320, boxShadow:'0 4px 24px #0003', maxWidth:420, margin:'32px auto'}}>
              <h3>Edição do mês {editMes.mes}/{editMes.ano}</h3>
              <div style={{marginBottom:16}}>
                <b>Pagamentos dos Irmãos:</b>
                <ul style={{listStyle:'none', padding:0, margin:0}}>
                  {editMes.irmaos.map(cim => (
                    <li key={cim} style={{margin:'6px 0'}}>
                      <label style={{display:'flex', alignItems:'center', gap:8}}>
                        <span style={{minWidth:60}}>CIM {cim}</span>
                        {/* Toggle Switch */}
                        <span style={{display:'inline-block'}}>
                          <label className="switch">
                            <input type="checkbox" checked={editMes.pagos.includes(cim)} onChange={e => handleTogglePagamento(cim, e.target.checked)} />
                            <span className="slider round"></span>
                          </label>
                        </span>
                        {editMes.statusUsuarios && editMes.statusUsuarios[cim] ? (
                          <span style={{fontSize:13, color: statusColor(editMes.statusUsuarios[cim])}}>[{editMes.statusUsuarios[cim]}]</span>
                        ) : null}
                      </label>
                      {/* Pergunta de recibo */}
                      {reciboCim === cim && (
                        <div style={{marginLeft:70, marginTop:4, fontSize:14, color:'#1877f2'}}>
                          Enviar recibo para o usuário?
                          <button style={{marginLeft:8, background:'#1877f2', color:'#fff', border:'none', borderRadius:6, padding:'2px 10px', fontWeight:600, cursor:'pointer'}} onClick={()=>handleEnviarRecibo(cim)}>Sim</button>
                          <button style={{marginLeft:8, background:'#ccc', color:'#222', border:'none', borderRadius:6, padding:'2px 10px', fontWeight:600, cursor:'pointer'}} onClick={()=>setReciboCim(null)}>Não</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{marginBottom:16}}>
                <label><b>Valor do Tronco:</b> <input type="number" min="0" value={editMes.tronco || 0} onChange={e => handleTroncoChange(e.target.value)} style={{width:90, border:'1px solid #bfa13a', borderRadius:6, padding:'2px 4px'}} /> </label>
              </div>
              <div style={{display:'flex', gap:12, justifyContent:'flex-end'}}>
                <button style={{background:'#4267b2', color:'#fff', border:'none', borderRadius:6, padding:'6px 18px', fontWeight:600, cursor:'pointer'}} onClick={handleSalvarEdicao}>Salvar</button>
                <button style={{background:'#ccc', color:'#222', border:'none', borderRadius:6, padding:'6px 18px', fontWeight:600, cursor:'pointer'}} onClick={()=>setEditMes(null)}>Cancelar</button>
              </div>
              {/* Toggle Switch CSS */}
              <style>{`
                .switch {
                  position: relative;
                  display: inline-block;
                  width: 44px;
                  height: 24px;
                }
                .switch input { 
                  opacity: 0;
                  width: 0;
                  height: 0;
                }
                .slider {
                  position: absolute;
                  cursor: pointer;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: #ccc;
                  -webkit-transition: .4s;
                  transition: .4s;
                }
                .slider:before {
                  position: absolute;
                  content: "";
                  height: 18px;
                  width: 18px;
                  left: 3px;
                  bottom: 3px;
                  background-color: white;
                  -webkit-transition: .4s;
                  transition: .4s;
                }
                input:checked + .slider {
                  background-color: #1877f2;
                }
                input:focus + .slider {
                  box-shadow: 0 0 1px #1877f2;
                }
                input:checked + .slider:before {
                  -webkit-transform: translateX(20px);
                  -ms-transform: translateX(20px);
                  transform: translateX(20px);
                }
                .slider.round {
                  border-radius: 24px;
                }
                .slider.round:before {
                  border-radius: 50%;
                }
              `}</style>
            </div>
          )}

          {/* Cards: pizza ao lado do saldo mensal */}
          <div className="secretaria-cards" style={{flexWrap:'nowrap', gap:32, justifyContent:'center', alignItems:'stretch', marginBottom:32, maxWidth:900, margin:'0 auto 32px auto'}}>
            <div className="secretaria-card" style={{flex:'1 1 320px', minWidth:260, maxWidth:400}}>
              <h2>Saldo Mensal e Tronco</h2>
              <Bar data={barData} options={{responsive:true, plugins:{legend:{position:'bottom'}}}} />
            </div>
            <div className="secretaria-card" style={{flex:'0 0 260px', minWidth:220, maxWidth:320}}>
              <h2>Pagamentos do Último Mês</h2>
              <Pie data={pieData} />
              <div style={{marginTop:12}}>
                <b>{pagos}</b> pagos / <b>{iregulares}</b> irregulares de <b>{total}</b> irmãos
              </div>
            </div>
            <div className="secretaria-card" style={{flex:'0 0 220px', minWidth:180, maxWidth:260, justifyContent:'center'}}>
              <h2>Caixa Livre (Tronco)</h2>
              <div className="secretaria-tronco">R$ {ultimoTronco},00</div>
              <div style={{fontSize:13, color:'#888'}}>Valor disponível para doações voluntárias</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Helpers e estado para edição
  // (já movidos para dentro do componente)
}

export default Secretaria;
