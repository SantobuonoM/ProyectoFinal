import { Router } from "express";
import { isAuth } from "../../utils/Authenticated.js";
const chatRouter = Router()

import {obtenerChat} from '../Controllers/chat.controller.js'

chatRouter.get('/', isAuth, obtenerChat)

export default chatRouter