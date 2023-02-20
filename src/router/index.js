const productsController= require('../products/controller.products')
const realTimeProductsController= require('../realtime/realTimeProducts')


const router= (app) =>{
    app.use('/api/products', productsController)
    app.use('/realTimeProducts', realTimeProductsController);

   
}

module.exports= router