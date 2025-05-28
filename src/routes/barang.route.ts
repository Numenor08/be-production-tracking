import express from 'express'
import BarangController from '../controllers/Barang.controller'

const router = express.Router()

router.get('/', BarangController.getAllBarang)
router.get('/:id', BarangController.getBarangById)
router.post('/', BarangController.createBarang)
router.put('/:id', BarangController.updateBarang)
router.delete('/:id', BarangController.deleteBarang)

export default router
