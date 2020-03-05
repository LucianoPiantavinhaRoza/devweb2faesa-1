const fs = require('fs');

var textoBiblia;
var textoSemPontuacao;
var textoPuro;
var textoSeparado;
var quantidadePalavras;
var objetoPalavras = {};
var final = [];

fs.readFile('bible.txt', 'utf-8', (err, data) => {
    textoBiblia = data.toLowerCase();
    //Regex pra tirar caracteres
    var sc = /[^a-zA-Z ]+/g
    //Regex pra tirar espaços no meio de cada elemento do vetor
    var ss = /r\n|\n|\r/g;
    //Selecionando palavras com 3 letras
    var sl = /w*\b\w{1,2}\b/g;
    //Aplicando os regex
    textoSemPontuacao = textoBiblia.replace(sc, ' ');
    textoPuro = textoSemPontuacao.replace(ss, ' ');
    textoTresPalavras = textoPuro.replace(sl, ' ');
    textoSeparado = textoTresPalavras.split(' ');
    //Filtrar apenas os elementos existentes no vetor(tirar elementos em branco)
    textoSemCampos = textoSeparado.filter(x => x);
    //Retorna todas as palavras da bíblia com o número de vezes que cada uma delas aparece
    quantidadePalavras = textoSemCampos.reduce(function (todasPalavras, palavra) { 
        if (palavra in todasPalavras) {
            todasPalavras[palavra]++;
        }
        else {
            todasPalavras[palavra] = 1;
        }
        return todasPalavras;
    }, {});
    //Separando todas as keys em outra variavel
    vetorChavesSeperadas = Object.keys(quantidadePalavras);
    //Ordenando os valores de todas as keys
    todosValoresOrdenado = vetorChavesSeperadas.sort((a, b) => quantidadePalavras[b] - quantidadePalavras[a]).map(key => objetoPalavras[key] = quantidadePalavras[key]);
    //Separando todas as palavras em outra variavel
    vetorTopdez = Object.keys(objetoPalavras);
    //Separando as 10 palavras mais recorrentes e seus respectivos valores
    topDez = vetorTopdez.slice(0, 10).map(key => ({[key]:objetoPalavras[key]}));
    //Separando Apenas as 10 palavras
    var dezPalavras = topDez.map(x => Object.getOwnPropertyNames(x)).flat();
    //Separando apenas as 10 ocorrencias
    var dezOcorrencias = topDez.map(x => Object.values(x)).flat();
    
    //console.log(quantidadePalavras);
    //console.log(todosValoresOrdenado)
    //console.log(topDez);
    console.log(dezPalavras);
    console.log(dezOcorrencias);
    final.push(dezPalavras, dezOcorrencias)
    return final;

    module.exports = final;
})