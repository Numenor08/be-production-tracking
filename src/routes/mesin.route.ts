import express from 'express'
import mesinController from '../controllers/Mesin.Controller'

const router = express.Router()

router.get('/', mesinController.getAllMesins)
router.get('/:id', mesinController.getMesinById)
router.post('/', mesinController.createMesin)
router.put('/:id', mesinController.updateMesin)
router.delete('/:id', mesinController.deleteMesin)

export default router
