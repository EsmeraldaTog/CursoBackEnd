const { Router }= require ('express')

const CartManager = require('../dao/MongoManager/mongoCartsManager');

const router= Router();


const carts= new CartManager()

router.get('/', async(req, res)=>{
    
    try {
        const allCarts= await carts.getCarts()
        res.json({allCarts})
        
    } catch (error) {
        res.status(500).json({message: error})
        
    }
})


router.post('/', async (req, res)=>{
    try{
        const newCart= await carts.addCart()
        res.status(200).send(newCart)
            }
        catch (error) {
            res.status(error);
        }

})



router.get('/:cid', async(req,res)=>{

    const {cid} =req.params

    const cartId= await carts.getCartById(Number(cid))
    res.send(cartId)
    

})


router.post('/:cid/product/:pid', async (req, res)=>{
    try{
        const {cid}= req.params
        const {pid} = req.params
        const addCart= await carts.addProductCart(Number(cid),pid)

        if(addCart==='No existe el carrito o producto')
        res.status(400).send('El producto no se encuentra dentro del inventario')
        else
        res.status(200).send('Se agrego producto exitosamente')
        
            }
        catch (error) {
            res.status(500).json({message:error})
           
        }

})

router.delete('/:cid/products/:pid', async(req, res)=>{

    try {
        
        const { cid, pid} = req.params
    
        const response= await carts.deleteProductFromCart(Number(cid),pid)
       
    res.status(200).send(` el producto con el ${pid} se ha borrado correctamente`)

       
    } catch (error) {
        res.status(500).send(error)
    }

})









module.exports = router