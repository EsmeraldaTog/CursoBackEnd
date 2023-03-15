const controllerProducts= require('../products/controllerProducts')
const controllerCarts =require('../carts/controllerCarts')


const router= (app) => {
    app.use('/api/products', controllerProducts)
    app.use('/api/carts', controllerCarts)
}

module.exports= router 