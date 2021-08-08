import { Controller, Get, Post, Req, Res } from '@nestjs/common'
import { Repository } from 'typeorm'
import User from '../../old-server/src/Entities/User'
import {genSalt, compare, hash} from 'bcrypt'
import { ILoginResponseDTO } from '../../types/DTOs'
import { generateAccessToken, generateRefreshToken } from '../Utils/jwtGenerator'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { InjectRepository } from '@nestjs/typeorm'

@Controller('/api/auth')
export class AuthController {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    @Get('/is-verify')
    async isVerify(@Req() req, @Res() res) {
        try {
            res.json(true)
        } catch (err) {
            console.log(err)
            res.status(500).json('Server error!')
        }
    }

    @Get('/refresh-token')
    async refreshToken(@Req() req, @Res() res) {
        const refreshToken: string = req.cookies.jid

        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload
            const newAccessToken = generateAccessToken(+payload.user.id)

            res.json({ accessToken: newAccessToken })
        } catch (err) {
            console.log(err)
            res.status(500).json(err.message)
        }
    }

    @Post('/login')
    async login(@Req() req, @Res() res) {
        try {
            const { email, password } = req.body
            console.log(email, password)

            const user = await this.usersRepository.findOne({ email })
            if (!user) {
                return res.status(401).json('Password or email is incorrect!')
            }

            const validPassword = await compare(password, user.password)
            if (!validPassword) {
                return res.status(401).json('Password of email is incorrect!')
            }

            const accessToken = generateAccessToken(user.id)

            const refreshToken = generateRefreshToken(user.id)
            res.cookie('jid', refreshToken)

            const responseDTO: ILoginResponseDTO = {
                accessToken,
                userData: {
                    email: user.email,
                },
            }

            res.json(responseDTO)

        } catch (err) {
            console.log(err)
            res.status(500).send('Server error!')
        }
    }

    @Post('/register')
    async register(@Req() req, @Res() res) {
        const { email, password } = req.body
        try {
            const user = await this.usersRepository.findOne({ where: { email } })
            if (user) return res.status(401).json('User already exists!')

            const salt = await genSalt(10)
            const bcryptPassword = await hash(password, salt)

            let newUser = this.usersRepository.create({ email, password: bcryptPassword })
            await this.usersRepository.save(newUser)

        } catch (e) {
            console.log(e)
        }
    }
}