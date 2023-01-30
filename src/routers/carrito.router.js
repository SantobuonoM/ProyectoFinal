import { Router } from "express"
const carritosRouter = Router()

import { isAuth } from "../../utils/Authenticated.js"

import { getCarrito, postCarrito, post_productos_carrito, delete_producto_carrito, compra_finalizada } from "../Controllers/carrito.controller.js"

carritosRouter.get('/', isAuth, getCarrito)

carritosRouter.post('/', postCarrito)

carritosRouter.post('/productos', post_productos_carrito)

carritosRouter.delete('/productos/:id', delete_producto_carrito)

carritosRouter.post('/compra_finalizada', compra_finalizada)

export default carritosRouter