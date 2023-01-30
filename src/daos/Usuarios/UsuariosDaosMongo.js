import ContainerMongo from "../../Containers/ContainerMongo.js";

import UsuariosModel from "../../Models/usuarios.models.js";

let instance = null
class UsuariosDaosMongo extends ContainerMongo {
    constructor(esquema) {
        super(UsuariosModel)
    }

    static getInstance() {
        if (!instance) {
          instance = new UsuariosDaosMongo()
        }
        return instance
    }
}

export default UsuariosDaosMongo