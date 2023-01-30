import ContainerMongo from "../../Containers/ContainerMongo.js";

import MensajesModel from "../../Models/mensajes.models.js";

let instance = null

class MensajesDaosMongo extends ContainerMongo {
    constructor(esquema) {
        super(MensajesModel)
    }

    static getInstance() {
        if (!instance) {
          instance = new MensajesDaosMongo()
        }
        return instance
    }
}

export default MensajesDaosMongo