import { config } from '../config/config.js'
import mongoose from 'mongoose'
import { logger } from '../../utils/logger.config.js'

let instance = null

class MongoDBClient {
    constructor() {
        this.connected = false
        this.client = mongoose
        this.firstConnection = (new Date()).toLocaleDateString()
    }

    async connect() {
        try {
            await this.client.connect(config.mongodb.host, config.mongodb.options)
            this.connected = true

            logger.info('Base de datos conectada')
        } catch (error) {
        logger.warn(error)
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            this.connected = false

            logger.info('Base de datos desconectada')
        } catch (error) {
            logger.warn(error)

        }
    }

    static getInstance() {
        if (!instance) {
            instance = new MongoDBClient()
        }
        return instance
    }
}

export default MongoDBClient