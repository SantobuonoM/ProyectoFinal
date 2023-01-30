import { Router } from "express"
const productosRouter = Router()

import { guardar_producto, listar_categoria, listar_productos, borrar_producto, borrar_productos, editar_producto, listar_producto } from "../Controllers/productos.controller.js"

productosRouter.get('/', listar_productos)

productosRouter.get('/:id', listar_producto)

productosRouter.post('/', guardar_producto)

productosRouter.post('/productos_categoria', listar_categoria)

productosRouter.put('/:id', editar_producto)

productosRouter.delete('/:id', borrar_producto)

productosRouter.delete('/', borrar_productos)

export default productosRouter