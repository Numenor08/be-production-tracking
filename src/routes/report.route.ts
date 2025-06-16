import express from 'express'
import reportController from '../controllers/report.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    reportIdValidation,
    createReportValidation,
    updateReportValidation,
    createReportItemValidation,
    reportItemIdValidation,
    updateReportItemValidation,
} from '../validations/report.validation'

const router = express.Router()

// Report routes
router.get('/', reportController.getAllReports)
router.get('/:id', validate(reportIdValidation), reportController.getReportById)
router.post(
    '/',
    validate(createReportValidation),
    reportController.createReport,
)
router.put(
    '/:id',
    validate([...reportIdValidation, ...updateReportValidation]),
    reportController.updateReport,
)

// Phase completion routes
router.post(
    '/:id/complete-phase',
    validate([...reportIdValidation, ...updateReportValidation]),
    reportController.completePhase,
)

// Report items routes
router.post(
    '/:reportId/items',
    validate([...reportIdValidation, ...createReportItemValidation]),
    reportController.addReportItem,
)
router.put(
    '/items/:itemId',
    validate([...reportItemIdValidation, ...updateReportItemValidation]),
    reportController.updateReportItem,
)
router.delete(
    '/items/:itemId',
    validate(reportItemIdValidation),
    reportController.deleteReportItem,
)

export default router
