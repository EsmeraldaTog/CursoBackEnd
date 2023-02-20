

const express= require('express');
const ProductManager = require('./productManager');

const PORT= 3000

const app= express()

const productos= new ProductManager('./products.json')

app.get('/productos', async (req, res)=>{
    try{
const {limit}= req.query
const arrayProductos= await productos.getProducts()
if(limit > 0) {

    let productsLimit = await arrayProductos.slice(0, limit);
   return res.send(productsLimit);
}
res.status(200).send(arrayProductos)
}
catch (error) {
    console.log(error.message);
}

})

app.get('/productos/:pid', async (req, res)=>{
    const {pid}= req.params
    const productId= await productos.getProductById(Number(pid))
    res.send(productId)
    })


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el ${PORT}`);
})

