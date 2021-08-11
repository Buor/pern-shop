import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ProjectRequest } from '../../../@types/types'

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware{
    use(req: ProjectRequest, res: Response, next: NextFunction) {
        //todo delete return statement. This made only for development.
        return next();

        try {
            const accessToken = req.headers.authorization?.split(' ')[1];
            
            if (!accessToken) {
                return res.status(401).json(false);
            }

            const payload: any = verify(accessToken, (process.env.ACCESS_TOKEN_SECRET as string) || 'ihifHf38v8W&*v2');

            req.user = payload.user;
            next();
        } catch (err) {
            console.log(err)
            res.status(403).json({msg: "Not Authorize"});
        }
    }
}