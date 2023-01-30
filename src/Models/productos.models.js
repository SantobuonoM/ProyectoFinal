import mongoose from "mongoose"

const SchemaProductos = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    categoria: {type: String, required: true},
    thumbnail: {type: String, required: true}
})
const ProductosModel = mongoose.model('productos', SchemaProductos)

export default ProductosModel