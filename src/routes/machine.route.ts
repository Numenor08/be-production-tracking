import express from 'express'
import machineController from '../controllers/machine.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    createMachineValidation,
    updateMachineValidation,
    machineIdValidation,
    paginationValidation,
} from '../validations/machine.validation'

const router = express.Router()

router.get(
    '/',
    validate(paginationValidation),
    machineController.getAllMachines,
)

router.get(
    '/:id',
    validate(machineIdValidation),
    machineController.getMachineById,
)

router.get(
    '/:id/stats',
    validate(machineIdValidation),
    machineController.getMachineStats,
)

router.post(
    '/',
    validate(createMachineValidation),
    machineController.createMachine,
)

router.put(
    '/:id',
    validate([...machineIdValidation, ...updateMachineValidation]),
    machineController.updateMachine,
)

router.delete(
    '/:id',
    validate(machineIdValidation),
    machineController.deleteMachine,
)

export default router
