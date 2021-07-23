import Router from 'express';
import authorize from "../middlewares/authorize";
import {getConnection} from "typeorm";
import User from "../entities/User";

const DashboardRouter = Router();

DashboardRouter.get('/', authorize, async (req,res) => {
    try {
        const manager = getConnection().manager;
        const user = await manager.findOne(User, {where: {id: req.user!.id}})

        res.json(user!.name);
    } catch (err) {
        console.log(err);
        res.status(500).json("Server error!");
    }
})

export default DashboardRouter