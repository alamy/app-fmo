import React, { useState } from 'react';
import './style.css';

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
          <h1>Loja Maçônica Flaviano Mendes de Oliveira Nº 43</h1>
          <p className="subtitle">Rito Schröder — Convidamos candidatos interessados a nos conhecer</p>
          <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.</p>
        </div>
      </section>
      <section className="about">
        <h2>Sobre a Loja</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.</p>
        <h3>Nosso Rito</h3>
        <p>Praticamos o Rito Schröder — tradição, simbolismo e prática iniciática. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
