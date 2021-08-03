import jwt from 'jsonwebtoken';
require("dotenv").config()

export function generateAccessToken(userId: number) {
    const payload = {
        user: {
            id: userId
        }
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: "15m"})
}

export function generateRefreshToken(userId: number) {
    const payload = {
        user: {
            id: userId
        }
    }

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: 60*60*24*30})
}

