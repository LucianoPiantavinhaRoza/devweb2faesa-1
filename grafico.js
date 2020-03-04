//Utilizando o Vue.js
var app = new vue({
    el:'#app',
    data: {
        URL: 'http://127.0.0.1:3000',
        numeros: [],
        palavras: [],
    },
    mounted: async function() {
        await this.chart();
    },
    methods: {
        getOcorrencias: async function() {
            await fetch(`${this.URL}/dezOcorrencias`)
                .then(response => response.json()
                .then(result => this.numeros = result))
        },
        
        getPalavras: async function(){
            await fetch(`${this.URL}/dezPalavras`)
                .then(response => response.json()
                .then(result => this.palavras = result))
        },
        chart: async function() {
            await this.getOcorrencias();
            await this.getPalavras();
            // Utilizando o Chart.js para renderizar o gráfico
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.palavras,
                    datasets: [{
                        label: '# of Votes',
                        data: this.getOcorrencias,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 5
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
});