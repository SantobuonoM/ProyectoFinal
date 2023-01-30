import dotenv from 'dotenv'
dotenv.config()

export const config = {
    mongodb: {
        host: process.env.MONGO_ATLAS,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}