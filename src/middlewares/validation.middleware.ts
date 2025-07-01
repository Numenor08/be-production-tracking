import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { BaseApiType } from '../types/baseApiType'

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)))

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return next()
        }

        const formattedErrors = errors.array().map((error: any) => ({
            path: error.path,
            message: error.msg,
            value: error.value,
        }))

        const response: BaseApiType = {
            status: 'error',
            message: 'Validation failed',
            data: null,
            metadata: {
                errors: formattedErrors,
            },
        }

        res.status(400).json(response)
    }
}

