

const express= require('express');
const ProductManager = require('./productManager');

const PORT= 3000

const app= express()

const productos= new ProductManager('products.json')

app.get('/productos', async (req, res)=>{
const arrayProductos= await productos.getProducts()
res.send(arrayProductos)
})

app.get('/productos/:pid', async (req, res)=>{
    const {pid}= req.params
    const productId= await productos.getProductById(Number(pid))
    res.send(productId)
    })


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el ${PORT}`);
})

