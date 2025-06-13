import { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils/api.utils'
import colors from 'colors'

colors.enable()

export const notFoundHandler = (
    req: Request, 
    res: Response, 
    _next: NextFunction
): void => {
    console.clear()
    console.log('   404 Not Found   '.black.bgRed)
    console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`.red)
    res.status(404).json(
        errorResponse(`Resource not found: ${req.method} ${req.originalUrl}`, {
            path: req.originalUrl,
            method: req.method,
            timestamp: new Date().toISOString()
        })
    )
}

export default notFoundHandler