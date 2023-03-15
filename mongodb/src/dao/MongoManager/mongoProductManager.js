const Products = require('../models/Products.model')


class ProductManager{

   

      async addProduct(producto){
        try{   
         
          const productsDB= await Products.find()
          // /// busca y trae de la coleccion de mongo  los productos filtrados con el mismo codigo
          const codeNoRepeat= await Products.findOne({code:producto.code})
           
        
              if (codeNoRepeat) {
                return 'Codigo del Producto Repetido'
              }
              //Asignamos id incremental 
              else {
                  
                if(productsDB.length=== 0){
                  producto ["id"]= 1 }
                  else {
                      let ultimoId = productsDB[productsDB.length - 1].id;
                      producto["id"] = ultimoId + 1;
        
                      }
                    }
                      
                  
                await Products.create(producto)
            
                return  producto
              }
                  catch (error) {
                                console.log(error.message);
                          }
                          

          }

        async getProducts(filter, condicionesQuery){

          
            try {
                const allProducts = await Products.paginate(filter, condicionesQuery);
                return allProducts;
            } 
            catch (error) {
                return error;
            }
        
        }
      


      async getProductById(id){
            try{
               

                const buscarId= await Products.findOne({id: id})
                
          
                if(buscarId)
                return buscarId
                else{
                  return `No existe producto con el Id:  ${id}`;
                }

                  }
            
                catch (error) {
                  console.log(error.message);
            }
            
              }

              
              async updateProduct(id, producto) {
                try {
                  
                  const productUpdate = await Products.findOneAndUpdate({id:Number(id)}, producto);
               return productUpdate

                } 

                catch (error) {
                  console.log(error.message);
            }
              }

          



            

              async deleteProduct(id){
                try{

                  const productDelete= await Products.findByIdAndRemove({_id:id.toString()})
                 
                          if(productDelete){

                            return `producto con el id ${id} eliminado`
                          }
                  
                          else{
                          `No se puede eliminar producto ya que el id ${id} no existe`
                          }
                   }

             
                catch (error) {
                  console.log(error.message);
            }
           

          }
        }



module.exports= ProductManager