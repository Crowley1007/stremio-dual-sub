
const fetch = require('node-fetch')
const zlib = require('zlib')
const { promisify } = require('util')
const gunzip = promisify(zlib.gunzip)


async function searchsubtitle(imdbid) {
    const parts = id.split(':');
    const imdbId = parts[0];
    const season = parts[1];
    const episode = parts[2];
    const idclear = imdbid.slice(2);
    let urlApi = `https://rest.opensubtitles.org/search/imdbid-${idclear}/sublanguageid-ita`;
    if (season && episode) {
        urlApi += `\season-${season}/episode-${episode}`;
    }
    const response = await fetch(urlApi, {
        headers: { 'User-agent': 'TemporaryUserAgent' }
    })
    const data = await response.json()
    console.log(data)
    const srtLegendas = data.filter(item => item.SubFormat === 'srt')
    const url = srtLegendas[0].SubDownloadLink
    const respostaGz = await fetch(url)
    const buffer = await respostaGz.buffer()
    const descompactado = await gunzip(buffer)
    return descompactado.toString('utf-8')
}

module.exports = { searchsubtitle }

