import {RequestHandler} from "express";
import jwt from 'jsonwebtoken';

require('dotenv').config();

const authorizeMiddleware: RequestHandler = (req, res, next) => {
    try {
        const token = req.header("jwt_token");

        if (!token) {
            return res.status(403).json({msg: "authorization denied"});
        }

        const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);

        req.user = payload.user;
        next();
    } catch (err) {
        res.status(403).json({msg: "Not Authorize"});
    }

}

export default authorizeMiddleware;