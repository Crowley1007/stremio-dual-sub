const SrtParser = require('srt-parser-2').default
const { traduzir } = require('./translator')


async function combinar(srtItaliano) {
    const parser = new SrtParser()
    const blocos = parser.fromSrt(srtItaliano)
    
    blocos.forEach(bloco => {
        bloco.text = bloco.text.replace(/X1:\d+ X2:\d+ Y1:\d+ Y2:\d+\s*/g, '')
    });

    const tamanhoLote = 50;
  for (let i = 0; i < blocos.length; i += tamanhoLote) {
    const lote = blocos.slice(i, i + tamanhoLote);
    const traducoes = await traduzir(lote.map(b => b.text))
    
    

    lote.forEach((bloco, index) => {
      const traducao = traducoes[index] || bloco.text;
      bloco.text = `${bloco.text}\n${traducao}`;
    });
  }

  return parser.toSrt(blocos);
}


module.exports = { combinar }
