const { Router }= require ('express')
const ProductManager = require('./productManager');
const upload= require('../utils');

 



const router= Router();

const productos= new  ProductManager('./src/products/products.json');


router.get('/', async (req, res)=>{
    try{
const {limit}= req.query
const arrayProductos= await productos.getProducts()
if(limit > 0) {

    let productsLimit = await arrayProductos.slice(0, limit);
   return res.send(productsLimit);
}
res.render('home.handlebars',{ 
    products: arrayProductos,
    style: 'products.css'})
}
catch (error) {
    console.log(error.message);
}

})



router.get('/:pid', async (req, res)=>{
    const {pid}= req.params
    const productId= await productos.getProductById(Number(pid))
    res.send(productId)
    })



// const clientes = [];

// io.on("connection", async (socket) => {

//     clientes.push(socket);

//     clientes.forEach( cliente => {
//         cliente.id = clientes.indexOf(cliente) + 1;
// })
//     console.log(`Cliente ${socket.id} conectado`);

//     const products = await productos.getProducts();
//     socket.emit("productos", products);

//     router.post('/', upload.single('file'), async (req, res)=>{
   
//         try{
      
//         const {title, description,code,price,status,stock,category,thumbnail}= req.body
        
    
    
//                     const producto= {
//                     title,
//                     description,
//                     code,
//                     price,
//                     status,
//                     stock,
//                     category,
//                     thumbnail
                    
//                     }
//                     producto.thumbnail=req.file.path
                    
//          const productNuevo= await productos.addProduct(producto)
     
//          const products = await manejadorDeProductos.getProducts();
         
         



//      if(productNuevo== 'Codigo del Producto Repetido')
//             {
                
//                  res.status(400).json({message: 'el codigo del producto ya existe'})
//                 } 
//                 else { 
//                     res.send(productNuevo) 
//                     io.emit("post", products[products.length-1]);} 
//         }
  
//      catch (error) {
//        res.status(400).json({message: 'Falta cargar imagen al campo thumbail'});
//  }
//   })

 

router.put('/:pid', upload.single('file'), async (req, res)=>{
try {

        const {pid}= req.params
        const {title, description,code,price,status,stock,category,thumbnail}= req.body
        
        const infoProduct={
            title,
            description,
            code,price,
            status,
            stock,
            category,
            thumbnail
        }

        infoProduct.thumbnail= req.file.path
        
        const productUpdate= await productos.updateProduct(Number(pid),infoProduct)
        res.send(productUpdate)}
        
        
        catch (error) {
            res.status(400).json({message: 'Falta cargar imagen al campo thumbail'});
      }
    
    
    })
                    
  
 

router.delete ('/:pid', async(req, res)=>{

    const {pid} = req.params

    const productFind= await productos.deleteProduct(Number(pid))
    res.send(productFind)
})

    

module.exports = router