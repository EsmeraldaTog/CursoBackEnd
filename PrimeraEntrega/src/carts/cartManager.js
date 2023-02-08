const fs= require('fs')




class CartManager{

  
    constructor (path,pathProducts){
        this.path = path,
        this.id,
        this.products= [],
        this.productsPath = pathProducts
       }

      async addCart(){
       
        try{   
         

          if(!fs.existsSync(this.path)){
            const dataCart = JSON.stringify([], null);
            await fs.promises.writeFile(this.path, dataCart);
        }
      
          //lectura del archivo
              const leerData= await fs.promises.readFile(this.path,"utf-8")
              const data= JSON.parse(leerData)
       
                if(data.length=== 0){

               this.id= 1 }
                  else {
                      let ultimoId = data[data.length - 1].id;
                      this.id = ultimoId + 1;
        
                      }
                    
                      const cart={ 
                        id:this.id,
                       products:this.products,   
                      }
                      
                   data.push(cart)

                   //escritura en el Archivo
                await fs.promises.writeFile(this.path,JSON.stringify(data),"utf-8")
            
                return  cart
              }
                  catch (error) {
                                console.log(error.message);
                          }
                          

          }
        

          async  addProductCart(cid,pid){

              try{   

                let quantity = 1
               
                //lectura del archivo carts
                    const leerData= await fs.promises.readFile(this.path,"utf-8")
                    const data= JSON.parse(leerData)
                    // console.log(data);

                  // lectura del archivo de productos
                    const leerDataProducts= await fs.promises.readFile(this.productsPath,"utf-8")
                    const dataProducts= JSON.parse(leerDataProducts)
                    // console.log(dataProducts);

                  const idCart= data.find( x=> x.id === Number(cid))
                  const idProduct= dataProducts.find( x => x.id === Number(pid))

                  if(idCart && idProduct)
                  {
                     

                      const productToAdd = {
                        product: idProduct.id,
                        quantity: quantity
                    }
                    

                      const productRepeated = idCart.products.find(x=> x.product === idProduct.id)

                      if(productRepeated)
                
                         productRepeated.quantity ++

                         else{

                          idCart.products.push(productToAdd)
                         }
                   
                  
                 
                  await fs.promises.writeFile(this.path,JSON.stringify(data),"utf-8")
                
                }
              

                  else {
                    return 'El carrito o producto no existen '
                  }

   
             
              }
                        catch (error) {
                                      console.log(error.message);
                                }
                                
      
                }
             


                  async getCartById (cid){ 

                    try{
                           //lectura del archivo carts
                           const leerData= await fs.promises.readFile(this.path,"utf-8")
                           const data= JSON.parse(leerData)
                           
                          const cartId= data.find(x => x.id === cid)
                                if(cartId)
                                return cartId.products
                                else{
                                  return `No existe carrito con el Id:  ${id}`
                                }
                
                                  }
                            
                                catch (error) {
                                  console.log(error.message);
                            }
                            
                              }

               

        }


    


 

//   const cartAdd= new CartManager('./carts.json','../products/products.json')
  
 
  

 
//   const ejecutar = async () => {
//   // // Descomentar cada una de las llamadas a los metodos de la clase 
//   // await cartAdd.addCart()
//  await cartAdd.addProductCart(1,1)

//   };
  
//   ejecutar();

module.exports = CartManager