const { translate } = require ('@vitalets/google-translate-api')



async function traduzir(texto) {
    const resultado = await translate(texto, {from: 'it', to: 'pt-br'})
    return resultado.text
} 
module.exports = {traduzir}