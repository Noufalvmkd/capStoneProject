const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://noufalvmkd:j6Ub97lmnpVstJQK@foodapp.o4l7q.mongodb.net/?retryWrites=true&w=majority&appName=foodApp')
 console.log( "datbase connected")
    }
    catch(error){
console.log(error)
    };
    
}
module.exports = connectDB;