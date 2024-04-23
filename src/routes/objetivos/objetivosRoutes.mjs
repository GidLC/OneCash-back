import express from 'express'
const objetivoRouter = express.Router()
import objetivosController from '../../controllers/objetivos/objetivosController.mjs'

objetivoRouter.post('/addObjetivo', objetivosController.addObjetivo)
objetivoRouter.get('/readObjetivos', objetivosController.readObjetivos)
objetivoRouter.delete('/deleteObjetivo', objetivosController.deleteObjetivo)

export default objetivoRouter