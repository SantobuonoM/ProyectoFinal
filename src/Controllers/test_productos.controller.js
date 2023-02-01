import express from 'express'
import {faker} from "@faker-js/faker";
faker.locale = 'es'

export const producto_random = (req, res) => {
    const CANT_PROD = 5
    const productos = []
    for (let index = 1; index <= CANT_PROD; index ++) {
        const prod = {
            id: index,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: `${faker.image.imageUrl()}?${index}`
        }
        productos.push(prod)
    }
    res.render('productos', {productos})
}