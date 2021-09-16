import {sign} from 'jsonwebtoken';
require("dotenv").config()

export function generateAccessToken(userId: number) {
    const payload = {
        user: {
            id: userId
        }
    }

    return sign(payload, (process.env.ACCESS_TOKEN_SECRET as string) || "ihifHf38v8W&*v2", {expiresIn: '15m'})
}

export function generateRefreshToken(userId: number) {
    const payload = {
        user: {
            id: userId
        }
    }

    return sign(payload, (process.env.REFRESH_TOKEN_SECRET as string) || 'vn* a8w6qf88wcV *(0', {
        expiresIn: 60*60*24*30
    })
}

