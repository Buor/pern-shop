import { Request } from "express"
export interface ProjectRequest extends Request {
    user: object
}