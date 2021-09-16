import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common'
import { Repository } from 'typeorm'
import User from '../../old-server/src/Entities/User'
import { genSalt, compare, hash } from 'bcrypt'
import { ILoginResponseDTO } from '../../types/DTOs'
import { generateAccessToken, generateRefreshToken } from '../utils/jwtGenerator'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { InjectRepository } from '@nestjs/typeorm'
import UserData, { UserRole } from '../entities/UserData'
import Basket from '../entities/Basket'

@Controller('/auth')
export class AuthController {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserData)
        private readonly userDataRepository: Repository<UserData>
    ) {
    }

    @Get('/is-verify')
    async isVerify() {
        try {
            return true
        } catch (err) {
            console.log(err)
            return 'Server error!'
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
    async login(@Body() reqBody, @Res() res) {

        const { email, password } = reqBody

        const user = await this.userRepository.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Password or email is incorrect!')
        }

        const validPassword = await compare(password, user.password)
        if (!validPassword) {
            throw new UnauthorizedException('Password or email is incorrect!')
        }

        const accessToken = generateAccessToken(user.id)

        const refreshToken = generateRefreshToken(user.id)
        res.cookie('jid', refreshToken)

        const responseDTO: ILoginResponseDTO = {
            accessToken,
            userData: {
                email: user.email
            }
        }

        return res.json(responseDTO)
    }

    @Post('/register')
    async register(@Body() reqBody, @Res() res): Promise<boolean> {
        const { email, password } = reqBody
        try {
            const user = await this.userRepository.findOne({ where: { email } })
            if (user) return res.status(401).json('User already exists!')

            const salt = await genSalt(10)
            const bcryptPassword = await hash(password, salt)

            //Creating UserData
            let userData = this.userDataRepository.create({
                firstName: '',
                phoneNumber: '',
                secondName: '',
                role: UserRole.User
            })
            await this.userDataRepository.save(userData)

            //Creating user basket
            const basket = await Basket.create().save()

            //Creating user
            let newUser = this.userRepository.create({
                email,
                password: bcryptPassword,
                userData,
                basket
            })

            await this.userRepository.save(newUser)

            res.json(true)
        } catch (err) {
            console.log(err)
        }
    }
}