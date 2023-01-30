import {Router} from 'express'
const testProductos = Router()

import {producto_random} from '../Controllers/test_productos.controller.js'
import { isAuth } from '../../utils/Authenticated.js'

testProductos.get('/', isAuth, producto_random)

export default testProductos