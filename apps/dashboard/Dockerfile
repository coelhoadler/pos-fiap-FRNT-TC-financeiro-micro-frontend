# Etapa base
FROM node:22-alpine AS base

# Habilita pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Instala dependências nativas necessárias (PostCSS, Tailwind, etc.)
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copia arquivos principais do monorepo
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./

# Copia todo o código (inclui apps e libs)
COPY . .

ENV CI=true

# Instala dependências do workspace inteiro
RUN pnpm install --frozen-lockfile

# Define diretório do dashboard
WORKDIR /app/apps/dashboard

# Expõe a porta usada
EXPOSE 8500

# Inicia o app
CMD ["pnpm", "run", "start"]
