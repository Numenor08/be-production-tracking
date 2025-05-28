import express from 'express'
import gudangController from '../controllers/Gudang.controller'

const router = express.Router()

router.get('/', gudangController.getAllGudang)
router.get('/:id', gudangController.getGudangById)
// router.post('/', gudangController.createGudang)
// router.put('/:id', gudangController.updateGudang)
// router.delete('/:id', gudangController.deleteGudang)

export default router
