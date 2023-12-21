import express, { response } from 'express'
import { readFile } from 'fs'

const app = express()

app.use(express.static('public'))

app.get('/', (request, response) => {
    readFile('test.html', 'utf-8', (err, data) =>{
        if(err) {response.send('Not Found File')}
        response.send(data)
    })
})

app.listen(3000)