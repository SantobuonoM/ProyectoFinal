import UsuariosDaosMongo from "../src/daos/Usuarios/UsuariosDaosMongo.js";
import { verifyPass } from "./bcrypt.js";

let api = UsuariosDaosMongo.getInstance()

export const loginPassport = async (username, password, done) => {
    const usuarios = await api.listarAll()
    const usuario = usuarios.find(usr => usr.email == username)
    
    if (!usuario) {
        return done(null, false)
    } else {
        const match = await verifyPass(usuario, password)
        if ( !match ) {
            return done(null, false)
        }
        return done(null, usuario)
    }
} 

