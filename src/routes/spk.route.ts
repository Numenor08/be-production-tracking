import express from 'express'
import spkController from '../controllers/Spk.controller'

const router = express.Router()

router.get('/', spkController.getAllSPK)
router.get('/:id', spkController.getSPKById)
router.post('/', spkController.createSPK)
router.put('/:id', spkController.updateSPK)
router.delete('/:id', spkController.deleteSPK)

export default router
