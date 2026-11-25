const fetch = require('node-fetch')
const zlib = require('zlib')
const { promisify } = require('util')
const gunzip = promisify(zlib.gunzip)
const iconv = require('iconv-lite');

function extrairPalavras(texto) {
    if (!texto) return [];
    return texto
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function similaridade(texto, filename) {
    const tokenA = extrairPalavras(texto)
    const tokenB = extrairPalavras(filename)

    const setA = new Set(tokenA);
    const setB = new Set(tokenB);

    if (setA.size === 0 || setB.size === 0) return 0;
    const emComum = [...setA].filter((word) => setB.has(word));
    const uniao = setA.size + setB.size - emComum.length;
    return  emComum.length / uniao;

}

async function searchsubtitle(imdbid, filename) {
    const parts = imdbid.split(':');
    const id = parts[0];
    const season = parts[1];
    const episode = parts[2];
    const idclear = id.slice(2);
    let urlApi = `https://rest.opensubtitles.org/search/imdbid-${idclear}/sublanguageid-ita`;
    if (season && episode) {
        urlApi += `\season-${season}/episode-${episode}`;
    }
    const response = await fetch(urlApi, {
        headers: { 'User-agent': 'TemporaryUserAgent' }
    })
    const data = await response.json()
    const srtLegendas = data.filter(item => item.SubFormat === 'srt');
    if (srtLegendas.length === 0) return null;
    srtLegendas.sort ((a, b) => {
    const notaA = similaridade(a.SubFileName, filename);
    const notaB = similaridade(b.SubFileName, filename);
    return notaB - notaA;
    });
    console.log('top 3:', srtLegendas.slice(0, 3).map(item => item.SubFileName));
    const url = srtLegendas[0].SubDownloadLink
    const respostaGz = await fetch(url)
    const buffer = await respostaGz.buffer()
    const descompactado = await gunzip(buffer)
    const toUtf8 = descompactado.toString('utf-8');
    return toUtf8.includes('\uFFFD')
    ? iconv.decode(descompactado, 'win1252')
    : toUtf8;
}

module.exports = { searchsubtitle }

