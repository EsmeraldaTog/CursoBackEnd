const fs= require('fs')




class ProductManager{

   
    constructor (path){
        this.path=path,
        this.products=[]
        
      
      }

      async addProduct(producto){
        try{   
          //lectura del archivo
              const leerData= await fs.promises.readFile(this.path,"utf-8")
              const data= JSON.parse(leerData)
          /// revisa que no tenga productos con codigos repetidos
              let codeNoRepeat= data.find(e => e.code === producto.code);

              if (codeNoRepeat) {
                return 'Codigo del Producto Repetido'
              }
              //Asignamos id incremental 
              else {
                  
                if(data.length=== 0){
                  producto ["id"]= 1 }
                  else {
                      let ultimoId = data[data.length - 1].id;
                      producto["id"] = ultimoId + 1;
        
                      }
                    }
                      
                  data.push(producto)
                await fs.promises.writeFile(this.path,JSON.stringify(data),"utf-8")
            
                return  producto
              }
                  catch (error) {
                                console.log(error.message);
                          }
                          

          }

        async getProducts(){

          const leerProducts= await fs.promises.readFile(this.path,"utf-8")
          const data= JSON.parse(leerProducts)

          return data
        }
      


      async getProductById(id){
            try{
                const leerData= await fs.promises.readFile(this.path,"utf-8")
                const data= JSON.parse(leerData)

                const buscarId= data.find(x => x.id === id)
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
      async updateProduct(id,producto){
              
                
              const leerUpdate= await fs.promises.readFile(this.path,"utf-8")
              const data= JSON.parse(leerUpdate);

            let  productUpdate= data.find(e => e.id === id)
           
            if(productUpdate){
              for(let key in producto) {
                  productUpdate[key] = producto[key];
              }
              // let index = data.findIndex(e => e.id === id)
              // data[index] = productUpdate
              await fs.promises.writeFile(this.path,JSON.stringify(data),"utf-8")
              return productUpdate
          } 
          
          else{
             return 'no existe producto con el id'
          }
           
              

              }


              async deleteProduct(id){
                try{
                  const leerArchivo= await fs.promises.readFile(this.path,"utf-8")
                  const data= JSON.parse(leerArchivo);

                  const productoaBorrar= data.find(x=>x.id===id)
                  if(productoaBorrar){

                    const productos= data.filter(x => x.id !== id)
                    await fs.promises.writeFile(this.path,JSON.stringify(productos),"utf-8")

                    return `se borro el producto con el id : ${id}`;
                   }
                   else{
                    return `No se puede eliminar producto ya que el id ${id} no existe`;
                   }

                }
                catch (error) {
                  console.log(error.message);
            }
            }

          
        }



module.exports= ProductManager