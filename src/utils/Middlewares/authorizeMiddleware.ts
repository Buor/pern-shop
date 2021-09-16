import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common'
import { ProjectRequest } from '../../../@types/types'

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware{
    use(req: ProjectRequest, res: Response, next: NextFunction) {
        try {
            const accessToken = req.headers.authorization?.split(' ')[1];

            if (!accessToken) {
                throw 'Error'
            }

            const payload: any = verify(accessToken, (process.env.ACCESS_TOKEN_SECRET as string) || 'ihifHf38v8W&*v2');

            req.user = payload.user;
            next();
        } catch (err) {
            throw new HttpException(`Authorization failed!`, 401)
        }
    }
}