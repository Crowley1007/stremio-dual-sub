
const fetch = require('node-fetch')
const zlib = require('zlib')
const { promisify } = require('util')
const gunzip = promisify(zlib.gunzip)


async function searchsubtitle(imdbid) {
    const idclear = imdbid.slice(2);
    const response = await fetch (`https://rest.opensubtitles.org/search/imdbid-${idclear}/sublanguageid-ita`)
    const data = await response.json()
    console.log(data)
    const srtLegendas = data.filter(item => item.SubFormat === 'srt')
    const url = srtLegendas[0].SubDownloadLink
    const respostaGz = await fetch(url)
    const buffer = await respostaGz.buffer()
    const descompactado = await gunzip(buffer)
    return descompactado.toString('utf-8')
}

module.exports = {searchsubtitle}

