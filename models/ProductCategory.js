var mongoose = require('mongoose')

var ProductCatSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, ' Enter the Category'],
        unique:[true, ' Name already entered'],
    },
    description:{
        type:String,
        required: [true, ' Enter the Description']
    },    

    image:{
        type:String,
        require:false
    }   
})

module.exports = mongoose.model("ProductCat",ProductCatSchema);