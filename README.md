

# app-fmo

🚀 **Sistema de Gestão Maçônica — React.js Moderno & Profissional**

## Sobre o Projeto

Este projeto é uma aplicação web robusta, desenvolvida com React.js, voltada para gestão de usuários, pagamentos e mensalidades em uma loja maçônica. O sistema destaca-se por arquitetura modular, integração com backend NestJS, experiência PWA e foco em usabilidade e segurança.

## Principais Diferenciais
- **Stack Moderno:** React.js, React Router, Axios, ESLint, PWA
- **Clean Code:** Componentização, hooks, services, separação de responsabilidades
- **UX/UI Profissional:** Layout responsivo, modal dinâmico, feedback visual, design inspirado nas cores do Facebook
- **Integração API:** CRUD completo via Axios com backend NestJS
- **Segurança:** Controle de senha, autenticação, edição restrita por perfil
- **PWA Ready:** Instale no celular e use offline

## Funcionalidades Técnicas
- Cadastro, edição, exclusão e visualização de usuários (nome, matrícula/CIM, grau, celular, senha)
- Modal para visualização e alteração de senha do usuário
- Dashboard Secretaria com gráficos mockados e bloqueios de edição
- Controle de mensalidades e arrecadação extra (campo "tronco")
- Rotas protegidas e navegação fluida

## Estrutura do Projeto
```
src/
├── pages/
│   ├── usuarios/
│   │   ├── Crud.jsx (CRUD com modal)
│   │   ├── style.css
│   │   └── index.jsx
│   ├── loja/, ritual/, secretaria/, recibo/, login/, inicio/
├── services/
│   └── usuarioService.js (Axios CRUD)
├── assets/, component/, types/
├── mensalidades.json, usuarios.json
├── routes.js, routes.tsx
public/
├── manifest.json (PWA)
```

## Como Executar
```sh
git clone https://github.com/alamy/app-fmo.git
cd app-fmo
npm install
npm start
```
Backend NestJS deve estar rodando em `http://localhost:1411`.

## Demonstração
- CRUD de usuários com modal de visualização/edição de senha
- Dashboard Secretaria com gráficos e bloqueios
- Instalação PWA no navegador

## API Usuários (NestJS)
- `GET /users` — Lista todos os usuários
- `GET /users/:id` — Busca usuário por ID
- `POST /users` — Cria usuário
- `PUT /users/:id` — Atualiza usuário
- `DELETE /users/:id` — Remove usuário

## Testes & Qualidade
- Testes automatizados: `npm test`
- Lint e qualidade: `npm run lint`

## Por que avaliar este projeto?
- Demonstra domínio de React.js moderno, hooks, integração API, PWA e boas práticas
- Código limpo, escalável e fácil de manter
- Foco em experiência do usuário e segurança
- Pronto para evoluir: fácil integração com outros sistemas

## Licença
MIT
