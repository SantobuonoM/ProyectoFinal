import ContainerMongo from "../../Containers/ContainerMongo.js";
import ProductosModel from "../../Models/productos.models.js";

let instance = null
class ProductosDaoMongo extends ContainerMongo {
    constructor() {
        super(ProductosModel);
    }

    static getInstance() {
      if (!instance) {
        instance = new ProductosDaoMongo()
      }
      return instance
    }

    async listarPorCategoria(categoria) {
        try {
          return await this.collection.find(categoria);
        } catch (error) {
          logError(error);
        }
    }
}

export default ProductosDaoMongo