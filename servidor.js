//Importanto os vetores de dados do index,js
const { dezPalavras, dezOcorrencias } = require('./index')
//const http = require('http');
//importanto o express
const express = require('express')
const server = express();
//Rota para vetor de palavras
server.get('/', (request, response) => {
    response.render('/index.js');
})
//Rota para vetor de palavras
server.get('/dezPalavras', (request, response) => {
    response.send(dezPalavras);
})
//Rota para vetor de ocorrencias
server.get('/dezOcorrencias', (request, response) => {
    response.send(dezOcorrencias);
})

const hostname = '127.0.0.1';
const port = 3000;

server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", '*'); 
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

server.listen(port, hostname, () => {
    console.log(`SERVIDOR RODANDO EM http://${hostname}:${port}/`);
})