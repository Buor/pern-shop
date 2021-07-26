import {Express} from "express"
import AuthRouter from "./auth.router"

export function applyRouters(app: Express) {
    app.use('/api/auth',AuthRouter);
}