const fetch = require('node-fetch');


async function traduzir(textos) {
    try {
    const response = await fetch('http://127.0.0.1:5000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: textos,
        source: 'it',
        target: 'pb',
        format: 'text'
      })
    });

    const data = await response.json();
    return data.translatedText || textos;
  } catch (error){
    console.error('Translate error', error.message);
    return textos;
  }
}
module.exports = { traduzir }