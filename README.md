
# app-fmo

Sistema de Gestão para Loja Maçônica

## Descrição

Este projeto é uma aplicação web desenvolvida em React para controle de usuários, mensalidades, pagamentos, recibos e integração com backend NestJS. O sistema é modular, responsivo e preparado para funcionar como PWA (Progressive Web App).

## Tecnologias Utilizadas
- React (JSX)
- React Router DOM
- Axios
- NestJS (backend, não incluso neste repositório)
- CSS customizado
- ESLint
- PWA (manifest.json)

## Estrutura de Pastas
```
├── public/
│   └── index.html, manifest.json, robots.txt
├── src/
│   ├── App.js, App.css, index.js, index.css
│   ├── assets/
│   ├── component/
│   ├── pages/
│   │   ├── usuarios/
│   │   │   ├── Crud.jsx, style.css, index.jsx
│   │   ├── loja/, ritual/, secretaria/, recibo/, login/, inicio/
│   ├── services/
│   │   └── usuarioService.js
│   ├── types/
│   ├── mensalidades.json, usuarios.json, post.json
│   ├── routes.js, routes.tsx
├── package.json
├── README.md
```

## Funcionalidades
- CRUD completo de usuários (nome, CIM, grau, celular, senha)
- Visualização detalhada do usuário em modal, com edição de senha
- Integração com backend NestJS via Axios (`http://localhost:1411/users`)
- Controle de mensalidades e arrecadação extra (campo "tronco")
- Dashboard Secretaria com gráficos (mock)
- Autenticação e controle de acesso
- PWA: instalação em dispositivos móveis

## Instalação
1. Clone o repositório:
	 ```sh
	 git clone https://github.com/alamy/app-fmo.git
	 cd app-fmo
	 ```
2. Instale as dependências:
	 ```sh
	 npm install
	 ```
3. Inicie o frontend:
	 ```sh
	 npm start
	 ```
4. Certifique-se de que o backend NestJS está rodando em `http://localhost:1411`.

## Uso
- Acesse `http://localhost:3000` no navegador
- Navegue pelas rotas:
	- `/usuarios` — CRUD de usuários
	- `/loja`, `/ritual`, `/secretaria`, `/recibo`, `/login`, `/inicio`
- Para editar ou visualizar usuários, utilize os botões na tabela
- Para instalar como PWA, utilize o botão de instalação no navegador

## API Usuários
- **GET** `/users` — Lista todos os usuários
- **GET** `/users/:id` — Busca usuário por ID
- **POST** `/users` — Cria usuário
- **PUT** `/users/:id` — Atualiza usuário
- **DELETE** `/users/:id` — Remove usuário

## Testes e Lint
- Para rodar testes:
	```sh
	npm test
	```
- Para verificar lint:
	```sh
	npm run lint
	```

## Contribuição
Pull requests são bem-vindos. Para grandes mudanças, abra uma issue primeiro para discutir o que deseja modificar.

## Licença
MIT
