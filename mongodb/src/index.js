const express = require('express');
const morgan= require('morgan');
const mongoose= require('mongoose')
const handlebars = require('express-handlebars')
const router = require('./routes');


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')

router(app)



// mongoose.set('strictQuery',false)
// mongoose.connect('mongodb+srv://admin:admin@cluster0.q2nkhyx.mongodb.net/?retryWrites=true&w=majority', error =>{
//         if(error){
//             console.log(`no se puede accesar a la db${error}`)
//         }
//         console.log('Conexion a la db')
//     });
   


    mongoose.connect('mongodb+srv://admin:admin@cluster0.q2nkhyx.mongodb.net/ecommerce?retryWrites=true&w=majority')
    
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB Atlas:', error);
    });
      
module.exports = app