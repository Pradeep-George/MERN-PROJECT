var mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, ' Enter the Name'],
        unique:[true, ' Name already entered'],
    },
    description:{
        type:String,
        required: [true, ' Enter the Description']
    },     
    cat_id:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:String,
        require:true,
        default:"active"
    },
    price:{
        type:Number,
        require:true,
        default:0
    },
    image:{
        type:String,
        require:false
    }    

})

module.exports = mongoose.model("Product",ProductSchema);