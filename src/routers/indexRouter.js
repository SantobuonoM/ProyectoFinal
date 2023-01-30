import passport from "passport"
import { Router } from "express"
const indexRouter = Router()

import { isAuth } from "../../utils/Authenticated.js"
import { NoImplementada } from "../../utils/logger.config.js"

import {inicio, login, error_login, error_registro, registro, post_registro, logout, logout_timeout, redirect_login, login_success} from '../Controllers/index.controller.js'

indexRouter.get('/vista', isAuth, inicio)

indexRouter.get('/login', login)

indexRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/error-login'
}), login_success)

indexRouter.get('/error-login', error_login)

indexRouter.get('/error-registro', error_registro)

indexRouter.get('/registro', registro)

indexRouter.post('/registro', post_registro)

indexRouter.get('/logout', logout)

indexRouter.get('/logout_timeout', logout_timeout)

indexRouter.get('/', redirect_login)


export default indexRouter