const SrtParser = require ('srt-parser-2').default
const { traduzir } = require ('./translator')


async function combinar (srtItaliano) {
    const parser = new SrtParser()
    const blocos = parser.fromSrt(srtItaliano)
    
    const combinado = await Promise.all(blocos.map(async (bloco) => {
        const traducao = await traduzir(bloco.text)
        return {...bloco, text:bloco.text + '\n' + traducao }
    }))
    return parser.toSrt(combinado)
}

module.exports = { combinar }
