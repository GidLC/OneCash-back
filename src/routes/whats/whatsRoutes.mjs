import express from 'express'
const whatsRouter = express.Router()
import whatsController from '../../controllers/whats/whatsController.mjs'

whatsRouter.post('/enviaWhats', whatsController.enviaWhats)

export default whatsRouter