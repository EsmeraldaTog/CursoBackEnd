const mongoose= require('mongoose')



const cartsCollection= 'carts'

const cartSchema = new mongoose.Schema({

        id: Number,
        products:{
            type:[
                {
                    product:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                    },
                    quantity:Number
                } 
            ],
            default:[]
        },

  });

 
  
  const Carts = mongoose.model(cartsCollection, cartSchema);
  
  module.exports = Carts;
  