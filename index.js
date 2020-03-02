const fs = require('fs');

var textoBiblia;
var textoSemNumeros;
var textoSemPontuacao;
var textoPuro;
var textoLimpo;
var textoPronto;
var objetoPalavras = {};

fs.readFile('bible.txt', 'utf-8', (err, data) => {
    textoBiblia = data;
    //Removendo número
    var sn = /[0-9]/g;
    //Removendo pontuação
    var sp = /[.:!?,;''()]/g;
    //Removendo espaços em branco
    var ss = /r\n|\n|\r/g;
    //Selecionando palavras com 3 letras
    var sl = /w*\b\w{1,2}\b/g;
    textoSemNumeros = textoBiblia.replace(sn, ' ');
    textoSemPontuacao = textoSemNumeros.replace(sp, ' ');
    textoPuro = textoSemPontuacao.replace(ss, ' ');
    textoLimpo = textoPuro.replace(sl, ' ');
    textoPronto = textoLimpo.split(' ');
    //console.log(textoPronto);
    //Pegar todas as palavras e o número de ocorrencias
    var quantidadePalavras = textoPronto.reduce(function(todasPalavras, palavra) {
        if(palavra in todasPalavras) {
            todasPalavras[palavra]++;
        } else {
            todasPalavras[palavra] = 1;
        }
        return todasPalavras;
    }, {});
    
    var aux = Object.keys(quantidadePalavras).sort((a, b) => {
        quantidadePalavras[b] - quantidadePalavras[a]
    }).map(key => {
        objetoPalavras[key] = quantidadePalavras[key]
    });
    
    //Pegar as 10 palavras e quantas vezes elas se repetem
    var topDez = Object.keys(objetoPalavras).slice(0,10).map(key => {
        ({[key]:objetoPalavras[key]})
    });

    //Vetor das 10 palavras
    var vetorPalavras = topDez.map(x => {
        Object.getOwnPropertyNames(x)
    }).flat();

    //Vetor ocorrencias das 10 palavras
    var vetorOcorrencias = topDez.map(x => {
        Object.values(x)
    }).flat();

    console.log(quantidadePalavras);
    console.log(aux)
    console.log(topDez);
    console.log(vetorOcorrencias);
    console.log(vetorPalavras);
})

/*
var texto;

fs.readFile('bible.txt', function read(err, data) {
    if (err) {
        throw err;
    }
    texto = data;
    console.log(texto);
});
*/

//https://github.com/raphaelmb/webdev2-I//