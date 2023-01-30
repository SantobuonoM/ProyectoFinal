import UsuariosDaosMongo from "../daos/Usuarios/UsuariosDaosMongo.js"
import ProductosDaoMongo from "../daos/Productos/ProductosDaoMongo.js"
import { logger, Ruta, NoImplementada } from "../../utils/logger.config.js"
import CarritosDaoMongo from "../daos/Carritos/CarritosDaoMongo.js"
import { generateHashPassword } from "../../utils/bcrypt.js"
import { enviarEmail } from "../../utils/mensajes.js"

let api = UsuariosDaosMongo.getInstance()
let api_prductos = ProductosDaoMongo.getInstance()
let api_carrito = CarritosDaoMongo.getInstance()

export const inicio = async (req, res) => {

    const username = req.user.username
    const email = req.user.email
    const avatar = req.user.avatar
    const admin = req.user.admin

    if (req.user) {

        const productos = await api_prductos.listarAll();

        logger.info(admin)
        res.render('vista', {username, email, avatar, productos, admin})
    } else {
        res.redirect('/login')
    }
}

export const login = (req, res) => {
    if(req.user) {
        const isAdmin = req.user.admin
        logger.info(isAdmin)

        res.redirect('/vista')
    } else {
        res.render('login')
    }
}

export const login_success = (req, res) => {
    logger.info(req.user)

    res.redirect('/vista')
}

export const error_login = (req, res) => {
    res.render('error-login')
}

export const error_registro = (req, res) => {
    res.render('error-registro')
}

export const registro = (req, res) => {
    res.render('registro')
}

export const post_registro = async (req, res) => {
    const {username, password, email, telefono, edad, direccion, avatar} = req.body

    const usuarios = await api.listarAll()
    const usuario = usuarios.find(usr => usr.email == email)
    
    if (usuario) {
        res.redirect('/error-registro')
    } else {
        await api.guardar({username, password: await generateHashPassword(password), email, telefono, edad, direccion, avatar, admin: false})
        await api_carrito.guardar({email, productos: []})  
        const carrito = await api_carrito.listarUno({ email })
        await enviarEmail(req.body)
        res.redirect('/login')
    }
}

export const logout = (req, res) => {
    const username = req.session.username
    req.session.destroy(err => {
        if(err) {
            res.json({err})
        } else {
            res.render('login')
        }
    })

}

export const logout_timeout = (req, res) => {
    res.render('logout_timeout', {})
}

export const redirect_login = async (req, res) => {
    res.redirect('/login')
}

export const no_implementada = (req, res) => {
    let ruta = req.url
    // logger.warn(`Ruta ${ruta} con metodo ${req.method} no implementada`)
    NoImplementada(req)
    res.send('ruta no implementada')
}
