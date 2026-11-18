const { addonBuilder, serveHTTP, publishToCentral }  = require('stremio-addon-sdk')
const { searchsubtitle } = require('./subtitles');
const {combinar} = require('./combiner')


const builder = new addonBuilder ({
    id: 'org.dualsub',
    version: '1.0.0',
    name: 'dualsub',
    catalogs: [],
    resources: ['subtitles'],
    types: ['movie', 'series'],
    idPrefixes: ['tt']
})

builder.defineSubtitlesHandler(async function(args) {
    const {id, type} = args;
    console.log(`Subtitle request received id: ${id} (${type})`);
    try {
        const legendaItaliano = await searchsubtitle(id);
        const gerarsrt = await combinar (legendaItaliano);
        console.log('---legenda baixada---');
        console.log(gerarsrt.substring(0, 500));
        console.log('----------------------');
        
     return { subtitles: [] };
    
  } catch (error) {
        console.error('erro ao receber legenda:', error.message);
        return {subtitles: [] };
  }
    
});

serveHTTP(builder.getInterface(), { port: 7000, static: '/legendas'})

