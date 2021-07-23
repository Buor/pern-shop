import jwt from 'jsonwebtoken';
require("dotenv").config()

function jwtGenerator(userId: number) {
    const payload = {
        user: {
            id: userId
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export default jwtGenerator;