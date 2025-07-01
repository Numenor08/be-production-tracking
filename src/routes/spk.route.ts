import express from 'express'
import spkController from '../controllers/spk.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    createSPKValidation,
    updateSPKValidation,
    spkIdValidation,
    spkPaginationValidation,
    completeSPKPhaseValidation,
    startSPKPhaseValidation,
    getSPKPhaseByStageValidation,
    deleteSPKPhaseValidation,
    createSPKItemValidation,
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

router.put(
    '/:id/phases/complete',
    validate(completeSPKPhaseValidation),
    spkController.completeSPKPhase,
)

router.get(
    '/:id/phases',
    validate(getSPKPhaseByStageValidation),
    spkController.getSPKPhaseByStage,
)

router.put(
    '/:id/phases',
    validate(startSPKPhaseValidation),
    spkController.startSPKPhase,
)

router.delete(
    '/:id/phases/:phaseId',
    validate(deleteSPKPhaseValidation),
    spkController.deleteSPKPhase,
)

router.post(
    '/:id/items',
    validate(createSPKItemValidation),
    spkController.createSPKItem,
)

export default router

