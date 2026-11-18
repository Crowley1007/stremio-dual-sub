const SrtParser = require ('srt-parser-2').default
const { traduzir } = require ('./translator')


async function combinar (srtItaliano) {
    const parser = new SrtParser()
    const blocos = parser.fromSrt(srtItaliano)
    
   for (const bloco of blocos.slice(0, 20)) {
    const traducao = await traduzir(bloco.text)
    bloco.text = bloco.text + '\n' + traducao
   }
   return parser.toSrt(blocos)
}

module.exports = { combinar }
