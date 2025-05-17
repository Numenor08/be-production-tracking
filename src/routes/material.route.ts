import express from 'express'
import materialController from '../controllers/material.controller'

const router = express.Router()

router.get('/', materialController.getMaterials)
router.get('/:id', materialController.getMaterialById)
router.post('/', materialController.createMaterial)
router.put('/:id', materialController.updateMaterial)
router.delete('/:id', materialController.deleteMaterial)

export default router
