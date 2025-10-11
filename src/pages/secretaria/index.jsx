
import { useEffect, useState } from 'react';
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
import mensalidades from '../../mensalidades.json';
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
  const [caixa, setCaixa] = useState([]);
  const [meses, setMeses] = useState([]);
  const [ultimoTronco, setUltimoTronco] = useState(0);

  useEffect(() => {
    const c = calcularCaixa(mensalidades);
    setCaixa(c);
    setMeses(c.map(m => `${m.mes}/${m.ano}`));
    setUltimoTronco(mensalidades[mensalidades.length-1]?.tronco || 0);
  }, []);

  // Dados para gráfico de pizza (pagos x irregulares do último mês)
  const ultimo = mensalidades[mensalidades.length-1];
  const pagos = ultimo?.pagos?.length || 0;
  const iregulares = ultimo?.iregulares?.length || 0;
  const total = ultimo?.irmaos?.length || 0;

  const pieData = {
    labels: ['Pagos', 'Irregulares'],
    datasets: [
      {
        data: [pagos, iregulares],
        backgroundColor: ['#bfa13a', '#222'],
        borderColor: ['#ffe600', '#888'],
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
        backgroundColor: '#bfa13a',
        borderColor: '#222',
        borderWidth: 1,
      },
      {
        label: 'Tronco (Caixa Livre)',
        data: caixa.map(m => m.tronco),
        backgroundColor: '#222',
        borderColor: '#ffe600',
        borderWidth: 1,
      }
    ],
  };

  // Filtros balancete
  const anos = Array.from(new Set(mensalidades.map(m => m.ano)));
  const [anoFiltro, setAnoFiltro] = useState(anos[anos.length-1]);
  const mesesFiltro = caixa.filter(m => m.ano === anoFiltro);
  const [mesFiltro, setMesFiltro] = useState('');
  const balancete = mesesFiltro.filter(m => !mesFiltro || m.mes === mesFiltro);

  return (
    <div className="loja-social-layout">
      {/* Topbar */}
    <Header />
      <div className="loja-main-content">
        {/* Sidebar */}
        <nav className="loja-sidebar">
          <ul>
            <li><a href="/inicio">Início</a></li>
            <li><a href="/loja">Loja</a></li>
            <li><a href="/ritual">Ritual</a></li>
            <li><a href="/secretaria" className="active">Secretaria</a></li>
          </ul>
        </nav>
        <main className="secretaria-dashboard">
          {/* Nome do usuário agora no Header */}
          {/* Balancete anual alinhado à direita em desktop */}
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
              <table style={{width:'100%', borderCollapse:'collapse', background:'#f7f7fa', color:'#222', fontFamily:'Segoe UI', fontSize:15, borderRadius:8, boxShadow:'0 1px 8px #0001'}}>
                <thead>
                  <tr>
                    <th style={{padding:'8px 6px'}}>Mês</th>
                    <th style={{padding:'8px 6px'}}>Receitas</th>
                    <th style={{padding:'8px 6px'}}>Custos</th>
                    <th style={{padding:'8px 6px'}}>Saldo</th>
                    <th style={{padding:'8px 6px'}}>Tronco</th>
                    <th style={{padding:'8px 6px'}}>Pagos</th>
                    <th style={{padding:'8px 6px'}}>Irregulares</th>
                  </tr>
                </thead>
                <tbody>
                  {balancete.map(m => (
                    <tr key={m.mes}>
                      <td style={{padding:'6px 4px', textAlign:'center'}}>{m.mes}/{m.ano}</td>
                      <td style={{padding:'6px 4px', textAlign:'right'}}>R$ {m.receitas},00</td>
                      <td style={{padding:'6px 4px', textAlign:'right'}}>R$ {m.custos},00</td>
                      <td style={{padding:'6px 4px', textAlign:'right', color: m.saldo >= 0 ? '#4267b2' : '#ff4d4d'}}>R$ {m.saldo},00</td>
                      <td style={{padding:'6px 4px', textAlign:'right'}}>R$ {m.tronco},00</td>
                      <td style={{padding:'6px 4px', textAlign:'center'}}>{m.pagos.length}</td>
                      <td style={{padding:'6px 4px', textAlign:'center'}}>{m.iregulares.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

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
}

export default Secretaria;
