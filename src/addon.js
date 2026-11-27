const { addonBuilder, serveHTTP, publishToCentral } = require('stremio-addon-sdk')
const { searchsubtitle } = require('./subtitles');
const { combinar } = require('./combiner')
const fs = require('fs')


const builder = new addonBuilder({
    id: 'org.dualsub',
    version: '1.0.0',
    name: 'dualsub',
    catalogs: [],
    resources: ['subtitles'],
    types: ['movie', 'series'],
    idPrefixes: ['tt']
})

builder.defineSubtitlesHandler(async function ({type, id, extra}) {
 
    try {
        const legendaItaliano = await searchsubtitle(id, extra?.filename);
        const safeId = id.replace(/:/g, '_');
        if (!legendaItaliano) {
            return {subtitles: []};
        }
        const gerarsrt = await combinar(legendaItaliano);
        console.log('---legenda baixada---');
        console.log(gerarsrt.substring(0, 500));
        console.log('----------------------');
        fs.mkdirSync('legendas', { recursive: true });
        fs.writeFileSync ( `legendas/${safeId}.srt`, gerarsrt )

        return { subtitles: [{
            id: id,
            url: `http://127.0.0.1:7000/legendas/${safeId}.srt`,
            lang: 'ita'
        }] };

    } catch (error) {
        console.error('erro ao receber legenda:', error.message);
        return { subtitles: [] };
    }



});

serveHTTP(builder.getInterface(), { port: 7000, static: '/legendas' })

