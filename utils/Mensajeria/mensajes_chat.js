import MensajesDaosMongo from "../../src/daos/Mensajes/MensajesDaoMongo.js";
import DaoMensajesArchivo from "../../src/daos/Mensajes/DaoMensajesArchivo.js";
import {normalize, schema} from "normalizr";
import { logger } from "../logger.config.js";

let mensajesApi2 = MensajesDaosMongo.getInstance()
let mensajesApi = new DaoMensajesArchivo('./DB/mensajes.json')

const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'})
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, {idAttribute: 'id'})
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, {idAttribute: 'id'})

const normalizarMensaje = (mensajesConId) => normalize(mensajesConId, schemaMensajes)

export const centro_mensajes = async (io) => {
    io.on('connection', async (socket) => {
        logger.info(`Un nuevo cliente se conecto ${socket.id}`)
    
        //const elem = await listarMensajesNormalizados()
        //console.log(util.inspect(elem, false, 12, true))
    
        io.sockets.emit('mensajes', await listarMensajesNormalizados())
        //socket.emit('mensajes', await mensajesApi.listarAll())
    
        socket.on('nuevoMensaje', async mensaje => {
            mensaje.fyh = new Date().toLocaleString()
            await mensajesApi2.guardar(mensaje)
            //console.log(mensaje)
            io.sockets.emit('mensajes', await listarMensajesNormalizados())
            //socket.emit('mensajes', await mensajesApi.listarAll())
        })
    })
}

async function listarMensajesNormalizados() {
    const mensajes = await mensajesApi2.listarAll()
    const normalizados = normalizarMensaje({id: 'mensajes', mensajes})
    return normalizados
}

