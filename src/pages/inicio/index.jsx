import React, { useState } from 'react';
import './style.css';
import videoBg from "../../assets/video.mp4";
// import logo from "../../assets/logo.png";
// import grande from "../../assets/grande.png";
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
        <div className="hero-inner">
          {/* <img src={logo} alt="Logo Loja 43" style={{height:80, marginBottom:16}} />
          <img src={grande} alt="Grande Mestre" style={{height:120, marginBottom:16, borderRadius: '50%', border: '4px solid #fff'}} /> */}
          <h1>Loja Maçônica Flaviano Mendes de Oliveira Nº 43</h1>
          <p className="subtitle">Rito Schröder — Convidamos candidatos interessados a nos conhecer</p>
          <p className="lead">Entre as colunas silenciosas do Templo, há um Rito que conserva a pureza e a simplicidade dos antigos mestres da Arte Real. Nascido do espírito reformador de Friedrich Ludwig Schröeder, o Rito Schröder – ou Rito Alemão – é o reencontro da Maçonaria com sua origem mais nobre: a busca da Verdade pela razão, pela moral e pelo trabalho.</p>

 <p className="lead">Quando a ritualística europeia se viu tomada por adornos e vaidades, Schröeder levantou-se como guardião da essência. Retirou os excessos, purificou os gestos e devolveu à Maçonaria a sua alma — a da reflexão interior, da ética, da fraternidade e do aperfeiçoamento do ser humano.</p>

 <p className="lead">Em nossa amada A∴R∴L∴S∴ Flaviano Mendes de Oliveira Nº43, praticamos com honra e zelo este Rito que fala diretamente ao coração dos homens de pensamento e de ação, empresários, profissionais liberais e estudiosos que reconhecem na Maçonaria uma escola viva de caráter e responsabilidade.</p>
  <video autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
 <p className="lead">Aqui, cada reunião é um exercício de elevação moral; cada símbolo, um espelho da consciência; cada palavra, um convite à construção silenciosa de um mundo mais humano.</p>

 <p className="lead">O Rito Schröder é o Rito daqueles que preferem a essência à aparência, o trabalho ao discurso, o humanismo ao dogma. É o Rito que ergue homens livres e de bons costumes, firmados sobre os alicerces do humanitarismo, da ética e da razão.</p>

 <p className="lead">Convidamos, pois, irmãos de todos os Orientes e peregrinos sinceros da Verdade a conhecer este caminho.<br/>
Na Flaviano Mendes de Oliveira Nº43, o Rito Schröder pulsa vivo — como chama que ilumina sem ostentar, como martelo que lapida sem ferir, como símbolo eterno de que a verdadeira Luz habita na simplicidade e na virtude..</p>
        </div>
      </section>
      <section className="about">
        <h2>Sobre a Loja</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.</p>
        <h3>Nosso Rito</h3>
        <p>Praticamos o Rito Schröder — tradição, simbolismo e prática iniciática. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
    </main>
  );
}

export default Inicio;
