import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import MongoDBClient from "./ContenedorMongoConnect.js";

class ContainerMongo {
    constructor(esquema) {
        this.collection = esquema
        this.conn = MongoDBClient.getInstance()
    }

    async guardar(objeto) {
        try {

            await this.conn.connect()

            const nuevaColeccion = new this.collection({ ...objeto });
            await nuevaColeccion.save();
            return nuevaColeccion;
        } catch (error) {
            throw new Error(error)
        } finally {
            await this.conn.disconnect()
        }
    }

    async listar(id) {
        try {

            await this.conn.connect()

            const docs = await this.collection.findOne({'_id': ObjectId(id)}, {__v: 0})
            if (!docs) return { Error: 'No encontramos lo que buscabas' };
            return docs;
        } catch (error) {
            throw new Error(`Error al listar ${error}`)
        } finally {
            await this.conn.disconnect()
        }
    }

    async listarAll() {
        try {
            await this.conn.connect()

            return await this.collection.find({})
        } catch (error) {
            throw new Error(error)
        }
    }

    async listarAllObj(obj) {
        try {
            await this.conn.connect()

            return await this.collection.find({obj})
        } catch (error) {
            throw new Error(error)
        }
    }

    async actualizar(id, nuevoElem) {
        try {   
            await this.collection.updateOne({ '_id': ObjectId(id) }, { $set: nuevoElem });
        } catch (error) {
            throw new Error(error)
        }
    }

    async borrar(id) {
        try {
            return await this.collection.deleteOne({'_id': ObjectId(id)})
        } catch (error) {
            throw new Error(error)
        }
    }

    async borrarAll() {
        try {
            return await this.collection.deleteMany({})
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default ContainerMongo
