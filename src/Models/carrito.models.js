import mongoose from "mongoose"

const SchemaCarritos = new mongoose.Schema({
    productos: {type: [], required: true},
    email: {type: String, require: true}
})
const CarritosModel = mongoose.model('carritos', SchemaCarritos)

export default CarritosModel