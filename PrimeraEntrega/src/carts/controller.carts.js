const { Router }= require ('express')

const CartManager = require('../carts/cartManager.js');

const router= Router();


const carts= new CartManager('./carts/carts.json','./products/products.json')




router.post('/', async (req, res)=>{
    try{
        const newCart= await carts.addCart()
        res.send(newCart)
            }
        catch (error) {
            console.log(error.message);
        }

})

router.post('/:cid/product/:pid', async (req, res)=>{
    try{
        const {cid}= req.params
        const {pid} = req.params
        const addProductCart= await carts.addProductCart(cid,pid)
        res.send(addProductCart)
            }
        catch (error) {
            console.log(error.message);
        }

})




router.get('/:cid', async(req,res)=>{

    const {cid} =req.params

    const cartId= await carts.getCartById(Number(cid))
    res.send(cartId)
    
    
   



})

module.exports = router