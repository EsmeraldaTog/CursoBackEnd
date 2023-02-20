const { Router }= require ('express')
const ProductManager = require('../products/productManager');


 



const router= Router();

const productos= new  ProductManager('./src/products/products.json');


router.get('/', async (req, res) => {
    const getAll = await productos.getProducts();
  io.emit('productsList', getAll);
    res.render('realTimeProducts.handlebars', { getAll });



});



module.exports = router;