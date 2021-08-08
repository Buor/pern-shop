import { NextFunction, Request, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ProjectRequest } from '../../../@types/types'

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware{
    use(req: ProjectRequest, res: Response, next: NextFunction) {
        try {
            const accessToken = req.headers.authorization?.split(' ')[1];

            if (!accessToken) {
                return res.json(false);
            }

            const payload: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
            console.log(payload)

            req.user = payload.user;
            next();
        } catch (err) {
            res.status(403).json({msg: "Not Authorize"});
        }
    }
}