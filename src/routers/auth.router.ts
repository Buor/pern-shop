import Router from 'express'
import {getConnection} from "typeorm"
import User from "../entities/User"
import bcrypt from 'bcrypt'
import {generateAccessToken, generateRefreshToken} from "../utils/jwtGenerator"
import authorize from '../middlewares/authorize'
import jwt, {JwtPayload} from 'jsonwebtoken'

const JwtRouter = Router()
JwtRouter.post('/register', async (req, res) => {
    const {email, name, password} = req.body
    try {
        const manager = getConnection().manager
        const user = await manager.findOne(User, {where: {email}})
        if (user) return res.status(401).json("User already exists!")

        const salt = await bcrypt.genSalt(10)
        const bcryptPassword = await bcrypt.hash(password, salt)

        let newUser = manager.create(User, {email, name, password: bcryptPassword})
        await manager.save(newUser)

    } catch (e) {
        console.log(e)
    }
})

JwtRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const manager = getConnection().manager

        const user = await manager.findOne(User, {email})
        if (!user) {
            return res.status(401).json("Password or email is incorrect!")
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json("Password of email is incorrect!")
        }

        const accessToken = generateAccessToken(user.id)

        const refreshToken = generateRefreshToken(user.id)
        res.cookie('jid', refreshToken)

        res.json({accessToken})

    } catch (err) {
        console.log(err)
        res.status(500).send("Server error!")
    }
})

JwtRouter.get('/is-verify', authorize, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.log(err)
        res.status(500).json("Server error!")
    }
})

JwtRouter.get('/refresh-token', async (req, res) => {
    const refreshToken: string = req.cookies.jid
    console.log(refreshToken)

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload
        const newAccessToken = generateAccessToken(+payload.user.id)

        res.json({accessToken: newAccessToken})
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
})

export default JwtRouter