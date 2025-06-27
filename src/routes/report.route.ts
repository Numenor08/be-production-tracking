import express from 'express'
import { validate } from '../middlewares/validation.middleware'
import reportController from '../controllers/report.controller'
import {
    getAllProductionReportValidation,
    getProductionReportByIdValidation,
} from '../validations/report.validation'

const router = express.Router()

router.get(
    '/',
    validate(getAllProductionReportValidation),
    reportController.getAllProductionReport,
)

router.get(
    '/:id',
    validate(getProductionReportByIdValidation),
    reportController.getProductionReportById,
)

export default router;