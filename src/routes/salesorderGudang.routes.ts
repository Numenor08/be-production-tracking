import express from 'express'
import salesOrderGudangController from '../controllers/salesorderGudang.controller'

const router = express.Router()

router.get('/', salesOrderGudangController.getAllSalesOrderGudang)
router.get('/:id', salesOrderGudangController.getSalesOrderGudangById)
router.post('/', salesOrderGudangController.createSalesOrderGudang)
router.put('/:id', salesOrderGudangController.updateSalesOrderGudang)
router.delete('/:id', salesOrderGudangController.deleteSalesOrderGudang)

export default router
