import mongoose from "mongoose"

const SchemaUsuarios = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    telefono: {type: Number, require: true},
    edad: {type: Number, require: true},
    direccion: {type: String, require: true},
    avatar: {type: String, require: true},
    admin: {type: Boolean}
})
const UsuariosModel = mongoose.model('usuarios', SchemaUsuarios)

export default UsuariosModel