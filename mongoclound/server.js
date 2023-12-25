import mongoose from "mongoose"
// const mongoose = require('mongoose')
import express from "express"
import { User } from "./models/User.js"
import { readFile } from "fs";
import {MONGO_URL} from './dburl.js'



const app = express();


console.log("mongod");
app.use(express.static('public/img'))
app.use(express.static('public/css'))

app.get('/', (request, response) => {
    readFile('./views/main.html', 'utf-8', (err, data) =>{
        if(err) {response.send('Not Found File')}
        response.send(data)
    })
})
const server = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('<== mongoDB Connected ==>');

        app.use(express.json());

        app.get("/user", async (req, res) => {
            try {
                const users = await User.find({})
                return res.send({ users: users })
            } catch (err) {
                console.log({ err });
                return res.status(500).send({ err: err.message })
            }
        })

        app.post("/user", async (req, res) => {
            try {
                let { username, name } = req.body;
                if (!username) return res.status(400).send({ err: "username is required" })
                if (!name) return res.status(400).send({ err: "name is required" })
                const user = new User(req.body);
                await user.save();
                return res.send({ user })
            } catch (err) {
                console.log({ err })
                return res.status(500).send({ err: err.message })
            }
        })
        app.listen(3000, () => console.log('server running on port 3000'))
    } catch (err) {
        console.log(err);
    }

}

server();