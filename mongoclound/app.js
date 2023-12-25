import express, { response } from 'express'
import { readFile } from 'fs'

const app = express()
console.log("chap1");
app.use(express.static('public/img'))
app.use(express.static('public/css'))

app.get('/', (request, response) => {
    readFile('./views/main.html', 'utf-8', (err, data) =>{
        if(err) {response.send('Not Found File')}
        response.send(data)
    })
})

app.get('/about', (req, res) => {
    readFile('chap01/about.html', 'utf-8', (err, data) => {
        if(err) { res.send('No Such File or Directory') }
        res.send(data)
    })
})


app.use((req, res, next) => {
    readFile('chap01/notFound.html', 'utf-8', (err, data) => {
        if(err) { res.status(404).send('404 Not Found') }
        res.status(404).send(data)
    })
})

app.listen(3000)