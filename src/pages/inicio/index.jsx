import React, { useState } from 'react';
import './style.css';
import videoBg from "../../assets/video.mp4";
import logo from "../../assets/fmo.png";
import grande from "../../assets/grande .png";
import sessao1 from "../../assets/banner/loja-maconico-flaviano-sessao-1.jpg";

import sessao3 from "../../assets/banner/loja-maconico-flaviano-sessao-3.jpg";
import ritual from "../../assets/banner/loja-maconico-flaviano-ritual.jpg";

const WHATSAPP_NUMBER = '+5581999712812'; // target number

const bannerImages = [
  { id: 1, src: sessao1, alt: 'Sessão Maçônica Flaviano Mendes - Ritual de Aprendiz' },
  { id: 2, src: sessao3, alt: 'Rito Schröder - Loja Flaviano Mendes - Trabalhos Maçônicos' },
  { id: 3, src: ritual, alt: 'Ritual Maçônico - Loja Flaviano Mendes de Oliveira Nº 43' },
  { id: 4, src: sessao1, alt: 'Sessão Maçônica Flaviano Mendes - Ritual de Aprendiz' },
];

function encodeWhatsAppMessage(text) {
  return encodeURIComponent(text);
}

function Inicio() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Candidato interessado - Loja Flaviano Mendes de Oliveira Nº 43\nNome: ${name}\nIdade: ${age}\nCidade: ${city}\nMensagem: ${message || '-'}\nRito: Rito Schröder`;
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeWhatsAppMessage(text)}`;
    window.open(url, '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  React.useEffect(() => {
    document.title = 'Loja Maçônica Flaviano Mendes de Oliveira Nº 43 | Rito Schröder - Recife PE';
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" className="logo-pequena" />
            <span>Flaviano Mendes Nº 43</span>
          </div>
          <nav className="navbar-menu">
            <a href="#inicio" className="nav-link">Início</a>
            <a href="#historia" className="nav-link">História</a>
            <a href="#rito" className="nav-link">O Rito</a>
            <a href="#gestao" className="nav-link">Gestão</a>
            <a href="#contato" className="nav-link">Contato</a>
          </nav>
        </div>
      </header>

      <main className="inicio-container">
      <section className="carousel-section" id="inicio">
        <div className="carousel-container">
          <div className="carousel-wrapper">
            {bannerImages.map((image, index) => (
              <div
                key={image.id}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
          
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label="Imagem anterior">
            &#10094;
          </button>
          <button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label="Próxima imagem">
            &#10095;
          </button>

          <div className="carousel-dots">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="hero-logos" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}>
            <img src={logo} alt="Logo Loja Maçônica Flaviano Mendes" style={{height:80, objectFit:'contain', filter:'drop-shadow(0 2px 8px #0002)'}} />
            <h1 style={{textAlign:'center', fontWeight:700, fontSize:'2.2rem', margin:0, color: 'var(--marfim-nobre)'}}>Loja Maçônica<br/>Flaviano Mendes<br/>de Oliveira Nº 43</h1>
          </div>
        </div>
        <div className="hero-inner">
          
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
      <section className="about" id="historia">
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

      <section id="rito" style={{scrollMarginTop: '80px'}}>
        <div className="about">
          <h3 style={{fontSize: '1.8rem', marginTop: 0}}>O Rito Schröder</h3>
          <p>
            Rito Schröder (em alemão: Schrödersche Lehrart). Este é um ritual maçônico utilizado por várias lojas na Alemanha. Criado por Friedrich Ulrich Ludwig Schröder e submetido aos Mestres de Hamburgo em 29 de junho de 1801, que o adotaram por unanimidade, desde logo, conquistou numerosas Lojas em toda a Alemanha e em outros países, onde passou a ser praticado, principalmente, por maçons de origem alemã e logo recebeu o cognome de seu fundador, rito schröder.
          </p>
          <p>
            Com o declínio do Rito da Estrita Observância, vários maçons estavam descontentes com esse estado de coisas. Dentre eles, destaca-se Friedrich Ludwig Schröder. Grande estudioso da maçonaria, Schröder desenvolveu um conjunto de rituais para as lojas simbólicas, fundamentando em dois princípios: o primeiro, o resgate dos princípios da maçonaria britânica; o segundo, buscar a simplicidade, eliminando elementos que ele considerava incompatíveis com a maçonaria moderna.
          </p>
          <p>
            Schröder se baseou em manuscritos ingleses tais como "Três batidas distintas" e "Maçonaria dissecada". Estudou vários ritos europeus e aboliu os chamados altos graus, aproximando-se da filosofia dos Modernos. Schröder e sua comissão ritualística obtiveram grande aceitação da maçonaria alemã ao seu rito, de caráter humanista e rara beleza.
          </p>
        </div>
      </section>

      <section id="gestao" style={{scrollMarginTop: '80px'}}>
        <div className="gestao-section">
        <h2>Nossa Gestão Atual</h2>
        <p className="section-subtitle">Conheça os dirigentes de nossa Loja</p>
        <div className="gestao-cards">
          <div className="card">
            <div className="card-initials">VM</div>
            <h3>Venerável Mestre</h3>
            <p className="card-name">Jonas Adriano</p>
          </div>
          <div className="card">
            <div className="card-initials">1V</div>
            <h3>1º Vigilante</h3>
            <p className="card-name">Walmir Soares</p>
          </div>
          <div className="card">
            <div className="card-initials">2V</div>
            <h3>2º Vigilante</h3>
            <p className="card-name">Anderson</p>
          </div>
        </div>
        </div>
      </section>

      <section className="calendario-section">
        <h2>Calendário de Atividades</h2>
        <p className="section-subtitle">Confira as datas e horários das nossas sessões</p>
        <div className="calendario-info">
          <div className="info-item">
            <h3>📅 Seções Regulares</h3>
            <p>Terças-feiras</p>
          </div>
          <div className="info-item">
            <h3>🕖 Horário</h3>
            <p>19:30</p>
          </div>
          <div className="info-item">
            <h3>📍 Local</h3>
            <p>R. Profa. Ângela Pinto, 70 - Torre<br/>Recife - PE, 50710-010</p>
          </div>
        </div>
      </section>

      <section id="contato" style={{scrollMarginTop: '80px'}}>
        <div className="form-section">
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
        </div>
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
    </>
  );
}

export default Inicio;
