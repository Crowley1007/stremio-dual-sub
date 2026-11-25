const { combinar } = require('./combiner')
const { subtitle, searchsubtitle } = require('./subtitles')

async function testelegenda() {
    const imdbid = 'tt0209144'
    const filename = 'Memento.2000.1080p.BluRay.x264.mp4';

    console.log('looking for subtitle like', filename);
    const legendaSrt = await searchsubtitle(imdbid, filename);;
if (legendaSrt) {
    console.log('Subtitle success found: \n');
    console.log(legendaSrt.slice (0,300));
} else {
    console.log ('not found subtitle');
}
}
testelegenda();