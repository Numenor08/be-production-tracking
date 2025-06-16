import express from 'express'
import spkController from '../controllers/spk.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    createSPKValidation,
    updateSPKValidation,
    spkIdValidation,
    spkPaginationValidation,
} from '../validations/spk.validation'

const router = express.Router()

router.get('/', validate(spkPaginationValidation), spkController.getAllSPK)

router.get('/:id', validate(spkIdValidation), spkController.getSPKById)

router.post('/', validate(createSPKValidation), spkController.createSPK)

router.put(
    '/:id',
    validate([...spkIdValidation, ...updateSPKValidation]),
    spkController.updateSPK,
)

router.delete('/:id', validate(spkIdValidation), spkController.deleteSPK)

router.put('/:id/phase-progress', spkController.updatePhaseProgress)

export default router
