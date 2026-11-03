const { combinar } = require('./combiner')

combinar(`1
00:01:23,400 --> 00:01:26,800
Ciao, come stai?

2
00:01:27,000 --> 00:01:29,500
Sto bene, grazie!`).then(resultado => console.log(resultado))