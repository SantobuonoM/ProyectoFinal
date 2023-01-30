import ContainerMongo from "../../Containers/ContainerMongo.js";
import CarritosModel from "../../Models/carrito.models.js";
import { logger } from "../../../utils/logger.config.js";

let instance = null

class CarritosDaoMongo extends ContainerMongo {
    constructor() {
        super(CarritosModel);
    }

    static getInstance() {
      if (!instance) {
        instance = new CarritosDaoMongo()
      }
      return instance
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }

    async listarUno(objeto) {
        try {
          return await this.collection.findOne(objeto);
        } catch (error) {
          logger.warn(error);
        }
    }

    async agregarProducto(email, elem) {
        try {
            await this.collection.updateOne({ email }, { $push: { productos: elem } })
        } catch (error) {
            logger.warn(error)
        }
    }

    async deleteProducto(email, id) {
        try {
          await this.collection.updateOne({ email }, { $pull: { productos: { id } } });
        } catch (error) {
          logError(error);
        }
    }

    async borrarTodosLosProductos(email) {
        try {
          await this.collection.updateOne({ email }, { $set: { productos: [] } });
        } catch (error) {
          logError(error);
        }
    }

}

export default CarritosDaoMongo