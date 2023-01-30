import mongoose from "mongoose"

const SchemaMensajes = new mongoose.Schema({
    author: {
        id: { type: String, require: true },
        firstname: { type: String, require: true },
        lastname: { type: String },
        edad: { type: Number },
        alias: { type: String },
        email: { type: String },
        avatar: { type: String, require: true }
    },
    fyh: { type: String, require: true },
    mensaje: {
        text: { type: String, require: true }
    }
})
const MensajesModel = mongoose.model('mensajes', SchemaMensajes)

export default MensajesModel