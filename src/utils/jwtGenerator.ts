import jwt from 'jsonwebtoken';
require("dotenv").config()

function jwtGenerator(userId: number) {
    const payload = {
        user: {
            id: userId
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1h"})
}

export default jwtGenerator;