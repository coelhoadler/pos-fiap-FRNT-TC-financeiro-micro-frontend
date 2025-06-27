# 💸 Projeto Financeiro — Pós FIAP

Este é um projeto feito com a multifrontend, cujo objetivo é representar as **transações financeiras** de um usuário.

## 👨‍💻 Autores do projeto 

- [@Adler Coelho](https://www.linkedin.com/in/adlercoelhosantos/)
- [@Erick Nunes](https://www.linkedin.com/in/erick-nunes-bb81a9136/)
- [@Robson Rodrigues](https://www.linkedin.com/in/robson-rodrigues-ribeiro/)
- [@Luiz Paulo](https://www.linkedin.com/in/luizpaulocaldas/) 
- [@Virgílio Cano](https://www.linkedin.com/in/virgiliocano/)


## Estruturação da aplicação

```
/microfrontends
  ├── /apps
  │   ├── /login (Angular)  
  │   ├── /home (React)
  │   ├── /root-config (Orquestração com Single-SPA)
  │
  ├── /shared
  │   ├── /components (Componentes reutilizáveis)
  │   ├── /services (Serviços compartilhados)
  │   ├── /utils (Funções auxiliares)
  │
  ├── /config
  │   ├── webpack.config.js (Configuração do Webpack)
  │   ├── tsconfig.json (Configuração do TypeScript)
  │   ├── package.json (Dependências do projeto)
  │
  ├── /scripts
  │   ├── build.sh (Script de build)
  │   ├── deploy.sh (Script de deploy)
```

## Docker + Mongodb
1 - Necessário que o Docker esteja rodando na máquina
2 - Necessário instalar o mongodb **npm install mongodb**


- /apps: Contém os microfrontends individuais, cada um com sua própria lógica e dependências.
- /shared: Armazena código reutilizável, como componentes, serviços e utilitários. **(verificar necessidade)**
- /config: Centraliza configurações do projeto, como Webpack e TypeScript. **(verificar necessidade)**
- /scripts: Scripts para automação de build e deploy. **(verificar necessidade)**
