import CarritosDaoMongo from "../daos/Carritos/CarritosDaoMongo.js"

import {logger, Ruta} from "../../utils/logger.config.js"
import {enviarEmailCompra, sendMensajeCompra} from '../../utils/mensajes.js'

let api = CarritosDaoMongo.getInstance()

export const getCarrito = async (req, res) => {

    const email = req.user.email
    const carrito = await api.listarUno({ email })

    const valores_carrito = carrito.productos

    if (carrito) {
        res.render('carrito', {valores_carrito})
    }
}

export const postCarrito = async (req, res) => {
    await api.guardar({productos: []})
    res.json({code: 201, msg: 'Nuevo producto agregado'})
}

export const post_productos_carrito = async (req, res) => {
    try {
       logger.info(req.body)
        const producto = req.body
        const email = req.user.email
        await api.agregarProducto(email, producto)
    } catch (error) {
        res.json({code: 500, msg: `Error al agregar producto al carrito ${error}`})
    }
}

export const delete_producto_carrito = async (req, res) => {
    const id_producto = req.params.id
    const email = req.user.email


    if (id_producto) {
        await api.deleteProducto(email, id_producto)
    }
    res.end()
}

export const compra_finalizada = async (req, res) => {

    const usuario = req.user.username
    const email = req.user.email

    const user = req.user

    const carrito = await api.listarUno({email})
    if (carrito != null) {
        await enviarEmailCompra(user, carrito)
        await sendMensajeCompra(user, carrito)
        await api.borrarTodosLosProductos(email)
    }
}