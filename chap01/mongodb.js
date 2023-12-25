
import mongodb, { MongoClient } from 'mongodb';
import express from 'express'
import mongoose, { Schema, mongo } from 'mongoose';

const app = express();

const url = 'mongodb+srv://root:root@elcrity.uc5pezs.mongodb.net/nodejs?retryWrites=true&w=majority';

MongoClient.connect(url)
.then(client => {
    console.log('mongodb connected');
    // console.log(client);
})
.then(app.listen(3000, () => {
    console.log('3000 port on');
}))
.catch(err => console.log(err));

const testSchema = new Schema({
    name : String,
});

const test = mongoose.model("test", testSchema);

test.insertOne({
    name : "qqqqq"
})

// console.log(query);