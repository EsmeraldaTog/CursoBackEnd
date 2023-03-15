const { Router }= require('express') 
const upload = require('../utils')

const ProductManager = require('../dao/MongoManager/mongoProductManager')


const router= Router()


const productos= new ProductManager()

router.get('/', async(req, res)=>{
    
    try {
        
        let linkMold = req.protocol + '://' + req.get('host') + '/api/products/';
        let limit;
        let page;
        let sort;
        let prevSort;
        let filter;

        if(req.query.category == undefined && req.query.stock == undefined){
            filter =  {};
        }
        else if(req.query.category == undefined && req.query.stock != undefined){
            filter = {
                stock: { $gte: req.query.stock }
            };
        }
        else if(req.query.category != undefined && req.query.stock == undefined){
            filter = {
                category: { $regex: req.query.category }
            };
        }
        else{
            filter = {
                category: { $regex: req.query.category },
                stock: { $gte: req.query.stock }
            };
        }

        if (req.query.limit == undefined) {
            limit = 10;
        }
        else {
            limit = req.query.limit;
        }

        if (req.query.page == undefined) {
            page = 1;
        }
        else {
            page = req.query.page;
        }

        if (req.query.sort == 'asc') {
            prevSort = 'asc';
            sort = 1;
        }
        else if (req.query.sort == 'desc') {
            prevSort = 'desc';
            sort = -1;
        }
        else {
            sort = undefined;
        }

        const condicionesQery = {
            page: page,
            limit: limit,
            sort: { price: sort }
        };
        //console.log(filter)


        const products = await productos.getProducts(filter, condicionesQery);
        let nextLink;
        let prevLink;
        if (products.hasPrevPage == false) {
            prevLink = null;
        }
        else {
            prevLink = req.protocol + '://' + req.get('host') + '/api/products' + '?' + `page=${products.prevPage}` + `&limit=${limit}&sort=${prevSort}`;
        }

        if (products.hasNextPage == false) {
            nextLink = null;
        }
        else {
            nextLink = req.protocol + '://' + req.get('host') + '/api/products' + '?' + `page=${products.nextPage}` + `&limit=${limit}&sort=${prevSort}`;
        }

        const respuestaInfo = {
            status: 'success',
            payload: products.docs,
            totalPges: products.totalDocs,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink,
            linkMold: linkMold
        };
        res.status(200).render('products.handlebars',{respuestaInfo:respuestaInfo}); 
console.log(respuestaInfo);
        // return res.render('products.handlebars',{respuestaInfo:respuestaInfo.payload})

    } catch (error) {
        res.status(500).json({ mesagge: { error} });
    }

});


router.get('/:pid', async (req, res)=>{


    try {
        
        const {pid}= req.params
        const productId= await productos.getProductById(Number(pid))
        res.send(productId)
    } catch (error) {
        res.status(400).json( { message: error})
      
    }
    })





router.post('/', upload.single('file'), async (req, res)=>{
   
    try{
  
    const {title, description,code,price,status,stock,category,thumbnail}= req.body
    


                const producto= {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail,
                
                }
                producto.thumbnail=req.file.path
                
     const productNuevo= await productos.addProduct(producto)
    //  productos.addProduct(producto)

     if(productNuevo==='Codigo del Producto Repetido')
            {
                 res.status(400).json({message: 'el codigo del producto ya existe'})
                } 
                else { 
                    res.send(productNuevo) } 
                }
  
     catch (error) {
       res.status(400).json({message: 'Falta cargar imagen al campo thumbail'});
 }
    })


    router.put('/:pid', upload.single('file'), async (req, res)=>{
        try {
            
                 const {pid}= req.params
                const {title, description,code,price,status,stock,category,thumbnail}= req.body
                
                const infoProduct={
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumbnail
                }
        
                infoProduct.thumbnail= req.file.path
                
               
        
                const productUpdate= await productos.updateProduct (Number(pid),infoProduct)
             
                
                res.status(200).send('Producto actualizado correctamente')}
                

                
                catch (error) {
                    res.status(400).json({message:`Product with ID ${pid} not found`});
                
                   
              }
            
            
            })
                            
                    
         

            router.delete ('/:pid', async(req, res)=>{

                try {
                    
                    const {pid} = req.params
                
                    const productFind= await productos.deleteProduct(pid)
                    if(productFind){
                        res.status(200).send(` el producto con el ${pid} se ha borrado correctamente`)
    
                    }
    
                    else{
                       res.status(400).send(`no se encontro el producto con el ${pid}`) 
                    }
                } catch (error) {
                    res.status(500).send(error)
                }

            })


module.exports = router