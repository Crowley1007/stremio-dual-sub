# Stremio Dual Sub

Add-on para o Stremio que exibe legenda dupla: o idioma original (italiano)
em cima e a tradução (português) embaixo, para estudar assistindo.

## Como funciona



## Como rodar

passos: 
1. npm install
2. instalar no Stremio ( se for local utlizar http://127.0.0.1:7000/manifest.json para instalar extensao no stremio )
3. terminal 1: & "C:\Users\Krist\AppData\Local\Programs\Python\Python313\Scripts\libretranslate.exe" --update-models --load-only en,it,pb
4. terminal 2: node src/addon.js
)

## Melhorias futuras

- Permitir escolher o idioma de origem e de destino (hoje é fixo: italiano → português)
- Melhorar a qualidade da tradução com contexto ou trocando para DeepL
  (falas curtas como "Ciao" são traduzidas sem contexto)
- Traduzir em lotes para ser mais rápido e evitar bloqueio do Google
- Cache das legendas já geradas (já em andamento com a pasta `legendas`)