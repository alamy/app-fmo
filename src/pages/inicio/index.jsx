import React, { useState } from 'react';
import './style.css';
import videoBg from "../../assets/video.mp4";
import logo from "../../assets/fmo.png";
import grande from "../../assets/grande .png";
const WHATSAPP_NUMBER = '+5581999712812'; // target number

function encodeWhatsAppMessage(text) {
  return encodeURIComponent(text);
}

function Inicio() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Candidato interessado - Loja Flaviano Mendes de Oliveira Nº 43\nNome: ${name}\nIdade: ${age}\nCidade: ${city}\nMensagem: ${message || '-'}\nRito: Rito Schröder`;
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeWhatsAppMessage(text)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="inicio-container">
      <section className="hero">
        <div className="hero-logos" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <img src={logo} alt="Logo Loja 43" style={{height:80, marginBottom:4, objectFit:'contain', filter:'drop-shadow(0 2px 8px #0002)'}} />
          
        </div>
        <div className="hero-inner">
          <h1 style={{textAlign:'center', fontWeight:700, fontSize:'2.2rem', marginBottom:8}}>Loja Maçônica Flaviano Mendes de Oliveira Nº 43</h1>
          
          <p className="lead">Entre as colunas silenciosas do Templo, há um Rito que conserva a pureza e a simplicidade dos antigos mestres da Arte Real. Nascido do espírito reformador de Friedrich Ludwig Schröeder, o Rito Schröder – ou Rito Alemão – é o reencontro da Maçonaria com sua origem mais nobre: a busca da Verdade pela razão, pela moral e pelo trabalho.</p>

          <p className="lead">Quando a ritualística europeia se viu tomada por adornos e vaidades, Schröeder levantou-se como guardião da essência. Retirou os excessos, purificou os gestos e devolveu à Maçonaria a sua alma — a da reflexão interior, da ética, da fraternidade e do aperfeiçoamento do ser humano.</p>

          <p className="lead">Em nossa amada A∴R∴L∴S∴ Flaviano Mendes de Oliveira Nº43, praticamos com honra e zelo este Rito que fala diretamente ao coração dos homens de pensamento e de ação, empresários, profissionais liberais e estudiosos que reconhecem na Maçonaria uma escola viva de caráter e responsabilidade.</p>
          <div style={{display:'flex', justifyContent:'center', margin:'24px 0'}}>
            <video autoPlay loop muted playsInline style={{maxWidth:'100%', borderRadius:12, boxShadow:'0 4px 24px #0003'}}>
              <source src={videoBg} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
          <p className="lead">Aqui, cada reunião é um exercício de elevação moral; cada símbolo, um espelho da consciência; cada palavra, um convite à construção silenciosa de um mundo mais humano.</p>

          <p className="lead">O Rito Schröder é o Rito daqueles que preferem a essência à aparência, o trabalho ao discurso, o humanismo ao dogma. É o Rito que ergue homens livres e de bons costumes, firmados sobre os alicerces do humanitarismo, da ética e da razão.</p>

          <p className="lead">Convidamos, pois, irmãos de todos os Orientes e peregrinos sinceros da Verdade a conhecer este caminho.<br/>
            Na Flaviano Mendes de Oliveira Nº43, o Rito Schröder pulsa vivo — como chama que ilumina sem ostentar, como martelo que lapida sem ferir, como símbolo eterno de que a verdadeira Luz habita na simplicidade e na virtude..</p>
        </div>
      </section>
      <section className="about">
        <h2>Por que nossa Loja se chama Flaviano Mendes de Oliveira</h2>
        <p>
          A A∴R∴L∴S∴ Flaviano Mendes de Oliveira Nº 43 recebeu este nome em homenagem a um homem de alegria contagiante, talento múltiplo e coração fraterno: o Ir∴ Flaviano Mendes de Oliveira.
        </p>
        <p>
          Filho de comerciantes, Flaviano nasceu em Itaíba – PE e veio para o Recife ainda na infância, fixando residência no bairro do Ipsep. Desde cedo demonstrou ser uma pessoa de grande carisma, inteligência e dedicação.
        </p>
        <p>
          Ingressou por concurso no Banco do Brasil, onde rapidamente se destacou não apenas pela competência profissional, mas também por sua simpatia e disposição em servir. Jornalista por formação e vocação, contribuiu ativamente com os serviços de comunicação do banco e conquistou inúmeros amigos por onde passou.
        </p>
        <p>
          De espírito criativo e alegre, foi o idealizador do bloco carnavalesco “BB na Folia” e, mais tarde, do irreverente “O Gato Pingado”, conhecido como o menor bloco do mundo — composto apenas por ele mesmo, mas sempre cheio de entusiasmo e bom humor.
        </p>
        <p>
          Flaviano era também músico nato, herança familiar de seu avô Eloi e de seu tio Zé Popô, ambos artistas reconhecidos em sua terra natal. Tocava diversos instrumentos e formou, com amigos, a banda de forró “Mensageiros do Forró”, com a qual levou alegria a muitos encontros e celebrações.
        </p>
        <p>
          No convívio entre amigos e colegas, Flaviano era sinônimo de alegria, lealdade e fraternidade. Foi através dessas amizades que ingressou na Maçonaria, contribuindo de forma exemplar para o fortalecimento das colunas da nossa Sublime Ordem.
        </p>
        <p>
          Hoje, o Ir∴ Flaviano Mendes de Oliveira habita o Oriente Eterno, mas sua memória permanece viva entre nós. O nome de nossa Loja é, portanto, uma justa homenagem a este irmão querido, cuja vida foi marcada pela luz do amor fraterno, pela arte, pela alegria e pelo exemplo de humanidade.
        </p>
        <h3>Nosso Rito</h3>
        <p>
          Rito Schröder (em alemão: Schrödersche Lehrart). Este é um ritual maçônico utilizado por várias lojas na Alemanha. Criado por Friedrich Ulrich Ludwig Schröder e submetido aos Mestres de Hamburgo em 29 de junho de 1801, que o adotaram por unanimidade, desde logo, conquistou numerosas Lojas em toda a Alemanha e em outros países, onde passou a ser praticado, principalmente, por maçons de origem alemã e logo recebeu o cognome de seu fundador, rito schröder.
        </p>
        <p>
          Com o declínio do Rito da Estrita Observância, vários maçons estavam descontentes com esse estado de coisas. Dentre eles, destaca-se Friedrich Ludwig Schröder. Grande estudioso da maçonaria, Schröder desenvolveu um conjunto de rituais para as lojas simbólicas, fundamentando em dois princípios: o primeiro, o resgate dos princípios da maçonaria britânica; o segundo, buscar a simplicidade, eliminando elementos que ele considerava incompatíveis com a maçonaria moderna.
        </p>
        <p>
          Schröder se baseou em manuscritos ingleses tais como "Três batidas distintas" e "Maçonaria dissecada". Estudou vários ritos europeus e aboliu os chamados altos graus, aproximando-se da filosofia dos Modernos. Schröder e sua comissão ritualística obtiveram grande aceitação da maçonaria alemã ao seu rito, de caráter humanista e rara beleza.
        </p>
      </section>
       <section>
      
         </section>
      <section className="form-section">
        <h2>Quero ser candidato</h2>
        <p>Preencha o formulário abaixo e envie sua intenção via WhatsApp para nossa equipe.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            Idade
            <input type="number" value={age} onChange={e => setAge(e.target.value)} required min={16} />
          </label>
          <label>
            Cidade
            <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
          </label>
          <label>
            Mensagem (opcional)
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Escreva algo sobre seu interesse..." />
          </label>
          <div className="actions">
            <button type="submit" className="btn-primary">Enviar via WhatsApp</button>
            <a className="btn-secondary" href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">Abrir conversa</a>
          </div>
        </form>
      </section>
      <footer className="inicio-footer" style={{marginTop:40, padding:'32px 0 16px 0', background:'#f7f7f7', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:32}}>
        <img src={grande} alt="Grande Mestre" style={{height:54, borderRadius:'50%', border:'2.5px solid #fff', objectFit:'cover', boxShadow:'0 2px 12px #0002', marginBottom:0}} />
        <button
          onClick={() => window.location.href = '/login'}
          style={{
            background:'#222', color:'#fff', border:'none', borderRadius:24, padding:'10px 32px', fontWeight:600, fontSize:'1.1rem', cursor:'pointer', boxShadow:'0 2px 8px #0001', letterSpacing:1
          }}
        >
          wer ist da?
        </button>
      </footer>
    </main>
  );
}

export default Inicio;
