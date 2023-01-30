import ProductosDaoMongo from "../daos/Productos/ProductosDaoMongo.js"
import { logger, Ruta } from "../../utils/logger.config.js"

let api = ProductosDaoMongo.getInstance()

export const listar_productos = async (req, res) => {
    try {
        res.json(await api.listarAll())
    } catch (error) {
        logger.error(`Un error a ocurrido al listar ${error} `)
    }
}   

export const guardar_producto = async (req, res) => {
    try {
        Ruta(req)
        await api.guardar({...req.body})
        res.redirect('/vista')
    } catch (error) {
        logger.error(`Ha ocurrido un error ${error}`)
    }
}

export const listar_categoria = async (req, res) => {
    const {categoria} = req.body
    
    const productos = await api.listarAllObj(categoria)

    const productos_especificos = productos.filter(prod => prod.categoria == categoria)

    if (productos_especificos != null) {
        res.json(productos_especificos)
    } else {
        res.send('No hay productos con esa categoria')
    }

}

export const listar_producto = async (req, res) => {
    const id = req.params.id
    let prod = await api.listar(id)
    res.json(prod)
}

export const editar_producto = async (req, res) => {
    const id = req.params.id;
    const newProd = {...req.body};

    if (id && newProd) await api.actualizar(id, newProd);
    res.json(newProd);
}

export const borrar_producto = async (req, res) => {
    const id = req.params.id
    await api.borrar(id)
    res.json(`Producto con id ${id} borrado con exito`)
}

export const borrar_productos = async (req, res) => {
    await api.borrarAll()
    res.json('Productos borrados')
}