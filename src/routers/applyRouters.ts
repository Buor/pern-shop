import {Express} from "express"
import JwtRouter from "./jwtAuth"


export function applyRouters(app: Express) {
    app.use('auth',JwtRouter);
}