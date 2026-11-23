# Stremio Dual Sub

Add-on para o Stremio que exibe legenda dupla: o idioma original (italiano)
em cima e a tradução (português) embaixo, para estudar assistindo.

## Como funciona



## Como rodar

(passos: npm install, node src/addon.js, instalar no Stremio)

## Melhorias futuras

- Permitir escolher o idioma de origem e de destino (hoje é fixo: italiano → português)
- Melhorar a qualidade da tradução com contexto ou trocando para DeepL
  (falas curtas como "Ciao" são traduzidas sem contexto)
- Traduzir em lotes para ser mais rápido e evitar bloqueio do Google
- Cache das legendas já geradas (já em andamento com a pasta `legendas`)