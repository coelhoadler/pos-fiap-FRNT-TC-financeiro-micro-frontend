#!/bin/bash

# Nome de usuário no Docker Hub
DOCKER_USER="multidesenv"

# Lista de imagens locais e os nomes desejados no Docker Hub
declare -A images=(
  ["pos-fiap-frnt-tc-financeiro-micro-frontend-api"]="pos-fiap-api"
  ["pos-fiap-frnt-tc-financeiro-micro-frontend-transfers"]="pos-fiap-transfers"
  ["pos-fiap-frnt-tc-financeiro-micro-frontend-dashboard"]="pos-fiap-dashboard"
  ["pos-fiap-frnt-tc-financeiro-micro-frontend-login"]="pos-fiap-login"
  ["pos-fiap-frnt-tc-financeiro-micro-frontend-root-config"]="pos-fiap-root-config"
)

# Login no Docker Hub
docker login

# Loop para taguear e enviar cada imagem
for local_image in "${!images[@]}"; do
  hub_image="${DOCKER_USER}/${images[$local_image]}:latest"
  echo "🔄 Tagueando $local_image como $hub_image"
  docker tag "$local_image:latest" "$hub_image"

  echo "🚀 Enviando $hub_image para o Docker Hub..."
  docker push "$hub_image"
done

ec
