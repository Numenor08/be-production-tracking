import { Request, Response, NextFunction } from 'express'
import colors from 'colors'

colors.enable()

let currentPort: string | number = process.env.PORT || 3000

export const setPort = (port: string | number) => {
    currentPort = port
}

export const printServerBanner = () => {
    console.log('   Production Tracking API Server   '.black.bgGreen)
    console.log(`Server is running at http://localhost:${currentPort}\n`.green)
}

export const routeLogger = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    console.log(
        `${req.method} ${req.originalUrl} - ${new Date().toISOString()}`.cyan,
    )

    next()
}

export default routeLogger

