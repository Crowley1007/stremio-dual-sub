const { addonBuilder, serveHTTP, publishToCentral }  = require('stremio-addon-sdk')


const builder = new addonBuilder ({
    id: 'org.dualsub',
    version: '1.0.0',
    name: 'dualsub',
    catalogs: [],
    resources: ['subtitles'],
    types: ['movie'],
    idPrefixes: ['tt']
})

builder.defineSubtitlesHandler(function(args) {
    const {id, type} = args;
    return { subtitles: [] } 
})

serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 })

