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
  │   ├── /login (React ::8501)
  │   ├── /dashboard (React ::8500)
  │   ├── /root-config (Orquestração com Single-SPA ::9000)
```

- /apps: Contém os microfrontends individuais, cada um com sua própria lógica e dependências.

## Como Está Sendo Feito o Deploy

### Build e Deploy Independente

Cada microfrontend é construído e implantado de forma independente. Isso permite que cada equipe trabalhe e implante suas mudanças sem afetar outras partes da aplicação.

### Uso de Buckets S3 e CloudFront

Os arquivos estáticos de cada microfrontend são armazenados em diferentes pastas dentro do mesmo bucket S3. As distribuições CloudFront são usadas para servir esses arquivos estáticos de forma eficiente.

### AWS Amplify

GitHub Actions é usado para automatizar o processo de build e deploy. Cada vez que uma mudança é feita no código de um microfrontend, o GitHub Actions constrói e implanta essa mudança automaticamente.

## Comportamento da Aplicação

### Independência e Isolamento

Cada microfrontend é independente e isolado, o que facilita a manutenção e a escalabilidade. Mudanças em um microfrontend não afetam diretamente os outros microfrontends.

### Comunicação entre Microfrontends

A comunicação entre microfrontends pode ser feita usando eventos ou um estado compartilhado. Por exemplo, a aplicação principal pode disparar um evento para abrir o carrinho de compras, que é um módulo carregado dinamicamente.

## Requisitos

### Docker

- Faça o clone desse projeto
- Ter o Docker configurado na máquina. [Para mais informações](https://www.docker.com/).
- Após configurado, execute ```npm start```
- Acesse em: [localhost](//localhost:9000/).

### NPM

- Node 22+
- Faça o clone desse projeto
- Dentro da pasta do projeto, execute ```npm i -f```
- Para subir as aplicações, execute ```npm run start:dev```
- Acesse em: [localhost](//localhost:9000/).
