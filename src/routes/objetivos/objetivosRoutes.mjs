import express from 'express'
const objetivoRouter = express.Router()
import objetivosController from '../../controllers/objetivos/objetivosController.mjs'

objetivoRouter.post('/addObjetivo', objetivosController.addObjetivo)


export default objetivoRouter