import {RequestHandler} from "express";
import jwt from 'jsonwebtoken';

require('dotenv').config();

const authorizeMiddleware: RequestHandler = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            return res.status(403).json({msg: "authorization denied"});
        }

        const payload: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
        console.log(payload)
        req.user = payload.user;
        next();
    } catch (err) {
        res.status(403).json({msg: "Not Authorize"});
    }
}

export default authorizeMiddleware;