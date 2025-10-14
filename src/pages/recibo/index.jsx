import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usuarios from '../../usuarios.json';
import html2canvas from 'html2canvas';

function getRandomStep() {
  // Retorna um valor pequeno para garantir mínimo de 10s
  return Math.floor(Math.random() * 3) + 1; // 1 a 3%
}

export default function Recibo() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showRecibo, setShowRecibo] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const intervalRef = useRef();
  const reciboRef = useRef();
  const location = useLocation();
  const { nome, cim } = location.state || {};

  // Progresso e exibição do recibo
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setShowRecibo(true), 500);
      return;
    }
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        const next = prev + getRandomStep();
        return next > 100 ? 100 : next;
      });
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [progress]);

  // Gerar imagem automaticamente ao mostrar recibo
  useEffect(() => {
    if (showRecibo && reciboRef.current) {
      setImgLoading(true);
      setTimeout(async () => {
        const canvas = await html2canvas(reciboRef.current, {backgroundColor: '#f7f7fa'});
        const dataUrl = canvas.toDataURL('image/png');
        setImgUrl(dataUrl);
        setImgLoading(false);
      }, 100); // pequeno delay para garantir renderização
    }
  }, [showRecibo]);




  // Capturar recibo como imagem (caso queira refazer manualmente)
  async function handleCapture() {
    if (!reciboRef.current) return;
    setImgLoading(true);
    const canvas = await html2canvas(reciboRef.current, {backgroundColor: '#f7f7fa'});
    const dataUrl = canvas.toDataURL('image/png');
    setImgUrl(dataUrl);
    setImgLoading(false);
  }

  // Baixar imagem
  function handleDownload() {
    if (!imgUrl) return;
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = `recibo_${cim || 'pagamento'}.png`;
    link.click();
  }

  // Copiar imagem para área de transferência
  async function handleCopy() {
    if (!imgUrl) return;
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new window.ClipboardItem({ 'image/png': blob })
      ]);
      alert('Imagem copiada para a área de transferência!');
    } catch (e) {
      alert('Não foi possível copiar a imagem.');
    }
  }


  return (
    <div style={{maxWidth:440, margin:'60px auto', padding:32, background:'#fff', borderRadius:16, boxShadow:'0 4px 24px #0002', textAlign:'center'}}>
      {!showRecibo && (
        <>
          <h2 style={{marginBottom:24, color:'#1877f2'}}>Gerando Recibo...</h2>
          <div style={{width:'100%', height:32, background:'#e9ecef', borderRadius:16, overflow:'hidden', marginBottom:18, boxShadow:'0 1px 4px #0001'}}>
            <div style={{height:'100%', width:`${progress}%`, background:'#1877f2', transition:'width 0.4s', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:600, fontSize:18}}>
              {progress}%
            </div>
          </div>
          <div style={{color:'#888', fontSize:15}}>
            Aguarde enquanto o recibo é processado...
          </div>
        </>
      )}
      {showRecibo && (
        <>
          <div ref={reciboRef} style={{padding:16, borderRadius:12, background:'#f7f7fa', boxShadow:'0 1px 8px #0001', marginTop:8, display:'inline-block', minWidth:320,}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:24, marginBottom:18}}>
              <img src={require('../../assets/fmo.png')} alt="Logo FMO" style={{height:54, background:'#fff', borderRadius:8, boxShadow:'0 1px 4px #0001'}} />
              <img src={require('../../assets/grande .png')} alt="Logo Grande Loja" style={{height:54, background:'#fff', borderRadius:8, boxShadow:'0 1px 4px #0001'}} />
            </div>
            <h3 style={{color:'#1877f2', marginBottom:8}}>Recibo de Pagamento</h3>
            <div style={{fontSize:17, marginBottom:6}}><b>Nome:</b> {nome || '-'}</div>
            <div style={{fontSize:17, marginBottom:6}}><b>CIM:</b> {cim || '-'}</div>
            <div style={{fontSize:17, marginBottom:6}}><b>Valor:</b> R$ 120,00</div>
            <div style={{fontSize:17, marginBottom:16}}><b>Situação:</b> <span style={{color:'#1877f2'}}>Pago</span></div>
          </div>
          <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10, alignItems:'center'}}>
            <button onClick={() => navigate('/secretaria')} style={{background:'#eee', color:'#1877f2', border:'none', borderRadius:8, padding:'8px 22px', fontWeight:600, fontSize:15, boxShadow:'0 1px 4px #0001', cursor:'pointer', marginBottom:8}}>
              Voltar para Secretaria
            </button>
            {imgLoading && (
              <div style={{color:'#888', fontSize:15}}>Gerando imagem...</div>
            )}
            {imgUrl && (
              <>
                <img src={imgUrl} alt="Recibo em imagem" style={{marginTop:10, maxWidth:320, border:'1px solid #eee', borderRadius:8}} />
                <div style={{display:'flex', gap:10, marginTop:8}}>
                  <button onClick={handleDownload} style={{background:'#1877f2', color:'#fff', border:'none', borderRadius:8, padding:'6px 18px', fontWeight:600, fontSize:15, boxShadow:'0 1px 4px #0001', cursor:'pointer'}}>
                    Baixar imagem
                  </button>
                  <button onClick={handleCopy} style={{background:'#1877f2', color:'#fff', border:'none', borderRadius:8, padding:'6px 18px', fontWeight:600, fontSize:15, boxShadow:'0 1px 4px #0001', cursor:'pointer'}}>
                    Copiar imagem
                  </button>
                </div>
              </>
            )}
            {!imgUrl && !imgLoading && (
              <button onClick={handleCapture} style={{background:'#1877f2', color:'#fff', border:'none', borderRadius:8, padding:'8px 22px', fontWeight:600, fontSize:15, boxShadow:'0 1px 4px #0001', cursor:'pointer'}}>
                Gerar imagem do recibo
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}