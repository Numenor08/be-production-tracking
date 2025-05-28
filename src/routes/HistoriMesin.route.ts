import express from 'express'
import historiMesinController from '../controllers/HistoriMesin.controller'

const router = express.Router()

router.get('/', historiMesinController.getAllHistoriMesin)
router.get('/:id', historiMesinController.getHistoriMesinById)
router.post('/', historiMesinController.createHistoriMesin)
router.put('/:id', historiMesinController.updateHistoriMesin)
router.delete('/:id', historiMesinController.deleteHistoriMesin)

export default router
