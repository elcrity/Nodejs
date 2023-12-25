import mongoose from "mongoose"

//commonJs
// const userSchema = new mongoose.Schema({
//     username : {type : String, required : true},
//     name : {
//         first: {type:String, required : trud},
//         last: {type:String, required : trud},
//     },
//     age : Number,
//     email : String
// }, {timestamps:true})

// const User = mongoose.model("user", userSchema)
// module.exports = {User};

// es6
const UserSchema  = new mongoose.Schema({
    username : {type : String, required : true},
    name : {
        first: {type:String, required : true},
        last: {type:String, required : true},
    },
    age : Number,
    email : String
}, {timestamps:true})
const User = mongoose.model("user", UserSchema)
export { User };