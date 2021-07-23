import Router from 'express';
import {getConnection, getConnectionManager} from "typeorm";
import User from "../entities/User";
import bcrypt from 'bcrypt';
import jwtGenerator from "../utils/jwtGenerator";
import authorize from "../middlewares/authorize";

const JwtRouter = Router();

JwtRouter.post('/register', async (req, res) => {
    const {email, name, password} = req.body;
    try {
        const manager = getConnection().manager;
        const user = await manager.findOne(User, {where: {email}})
        if (user) return res.status(401).json("User already exists!");

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let newUser = manager.create(User, {email, name, password: bcryptPassword});
        newUser = await manager.save(newUser);

        const jwtToken = jwtGenerator(newUser.id);

        return res.json({jwtToken});
    } catch (e) {
        console.log(e);
    }
})

JwtRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const manager = getConnection().manager;

        const user = await manager.findOne(User, {email});
        if (!user) {
            return res.status(401).json("Password or email is incorrect!");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json("Password of email is incorrect!");
        }

        const token = jwtGenerator(user.id);
        res.json({token});

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error!");
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

export default JwtRouter;