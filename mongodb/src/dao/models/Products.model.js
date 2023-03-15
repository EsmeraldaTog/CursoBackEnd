const mongoose= require('mongoose')
const mongoosePaginate= require('mongoose-paginate-v2')


const productsCollection= 'products'

const productSchema= new mongoose.Schema({

title: String,
description: String,
code: Number,
price: Number,
status:Boolean,
stock: Number,
category: String,
thumbnail: String,
id: Number
})
productSchema.plugin(mongoosePaginate);

const Products = mongoose.model(productsCollection,productSchema)



module.exports= Products