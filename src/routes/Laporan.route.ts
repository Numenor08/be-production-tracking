import { Router } from 'express'
import laporanController from '../controllers/Laporan.controller'

const router = Router()

router.get('/', laporanController.getAllLaporan)
router.get('/:id', laporanController.getLaporanById)
router.post('/', laporanController.createLaporan)
router.put('/:id', laporanController.updateLaporan)
router.delete('/:id', laporanController.deleteLaporan)

export default router
