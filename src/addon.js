const { addonBuilder, serveHTTP, publishToCentral }  = require('stremio-addon-sdk')
const { searchsubtitle } = require('./subtitles');


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
    console.log('pedido de legenda recebida id: ${id} (${type})');
    try {
        const legendaItaliano = await searchsubtitle(id);
        console.log('---legenda baixada---');
        console.log(legendaItaliano.substring(0, 500));
        console.log('----------------------');
        
     return { subtitles: [] };
    
  } catch (error) {
        console.error('erro ao buscar legenda:', error.message);
        return {subtitles: [] };
  }
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 })

