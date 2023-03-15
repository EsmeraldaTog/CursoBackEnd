const Carts = require("../models/Carts.model");
const Products = require("../models/Products.model");

class CartManager {
  constructor() {
    this.id;
  }

  async addCart() {
    try {
      // trae registro de mi DB en mongoAtlas
      const cartData = await Carts.find();

      if (cartData.length === 0) {
        this.id = 1;
      } else {
        let ultimoId = cartData[cartData.length - 1].id;
        this.id = ultimoId + 1;
      }

      const cart = {
        id: this.id,
      };

      await Carts.create(cart);
    } catch (error) {}
  }

  async addProductCart(cid, pid) {
    try {
      let quantity = 1;

      // trae carrito  de la  DB en mongoAtlas que coincida con el cid
      const cartId = await Carts.findOne({ id: cid });
      
      // trae producto de la  DB en mongoAtlas que coincida con el pid
      const productId = await Products.findOne({ _id: pid });
      

      if (cartId && productId) {
        const productRepeated = cartId.products.find((x) => x.product == pid);
       

        if (!productRepeated) {
          const productToAdd = {
            product: productId._id,
            quantity: quantity,
          };

          cartId.products.push(productToAdd);
        } else {
          const productsArrayPosition = cartId.products.findIndex(
            (item) => item.product == pid
          );
          cartId.products[productsArrayPosition].quantity =
            cartId.products[productsArrayPosition].quantity + 1;
        }

        const response = await Carts.updateOne({ id: cid }, cartId);
        return response;
      } else return "No existe el carrito o producto";
    } catch (error) {
      console.log(`este es el error ${error}`);
    }
  }

  async getCartById(cid) {
    try {
      const buscarId = await Carts.findOne({ id: cid }).populate(
        "products.product"
      );

      if (buscarId) return buscarId;
      else {
        return `No existe carrito con el Id:  ${cid}`;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCarts() {
    try {
      const allCarts = await Carts.find().populate("products.product");

      return allCarts;
    } catch (error) {
      console.log(error);
    }
  }



  async deleteProductFromCart(cid,pid) {

      try {
          const cartId = await Carts.findOne({id: cid});
          console.log(cartId);
          const producto = await Products.findOne({_id:pid})
          console.log(producto);
        const _id = producto._id;
          const productToDelete = cartId.products.find(p => p.product == pid);
          console.log(productToDelete);
          if(!productToDelete){
              return `Product not found`;
          }
          await Carts.updateOne({id: cid}, {$pull: {products: productToDelete}})
          return `Product deleted`;
          
      } catch (error) {
          throw Error(error);
      }
  }
}

module.exports = CartManager;
