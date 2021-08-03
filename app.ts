import pool from "./src/Utils/pool"
import {createConnection} from "typeorm"
import User from "./src/Entities/User"
import express from 'express'
import path from 'path'
import cors from 'cors'
import {applyRouters} from "./src/Routers/applyRouters"

const cookieParser = require('cookie-parser');

(async () => {

    await createConnection({
        url: pool,
        type: "postgres",
        //todo
        // ssl: {
        //     rejectUnauthorized: false,
        // },
        entities: [User],
        synchronize: true
    })

    const app = express()

    app.use(express.json())

    app.use(cookieParser())

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "client/build")))
    } else {
        app.use(cors({
            origin: 'http://localhost:3000',
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
            credentials: true,
        }))
    }

    applyRouters(app)

    app.get('*', (req: any, res: any) => {
        res.sendFile(path.join(__dirname, "client/build/index.html"))
    })

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log("Server started on port " + PORT))
})()

