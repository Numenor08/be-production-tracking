import express from 'express'
import reportController from '../controllers/report.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    reportIdValidation,
    updateReportValidation,
    reportItemIdValidation,
    updateReportItemValidation,
} from '../validations/report.validation'

const router = express.Router()

// Report routes
router.get('/', reportController.getAllReports)
router.get('/:id', validate(reportIdValidation), reportController.getReportById)
router.put(
    '/:id',
    validate([...reportIdValidation, ...updateReportValidation]),
    reportController.updateReport,
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
