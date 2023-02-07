const express = require('express')
const router =require('./router')



const PORT= 8080;

const app= express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))






router(app)


app.listen(PORT,() =>{
     console.log(`Servidor corriendo en el Puerto ${PORT}`);
})

