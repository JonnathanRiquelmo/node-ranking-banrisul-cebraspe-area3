const { table } = require('console')
const { parse } = require('csv-parse')
const fs = require('fs')
const sortBy = require('sort-by')
const columnify = require('columnify')

const FILE_NAME = 'area3.csv'
const candidatos = []
var ranking, colunas

fs.createReadStream(FILE_NAME)
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (data) {
            candidatos.push(data)
        }
    })
    .on('error', (err) => {
        console.error(err)
    })
    .on('end', () => {
        ranking = candidatos.sort(sortBy('-notaFinalTotal', '-notaFinalP2', 'acertosP2', '-notaFinalP1'))
        table(ranking)
        colunas = columnify(ranking)

        let text = colunas + "\n\n===== ÁREA 3: DESENVOLVIMENTO SISTEMAS ===== \n\n CANDIDATOS CLASSIFICADOS:  " + ranking.length.toString()

        fs.writeFile('Lista Final.txt', text, function (err) {
            if (err) return console.log(err);
        });
    })


