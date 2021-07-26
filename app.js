"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("./src/utils/pool"));
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./src/entities/User"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const jwtAuth_1 = __importDefault(require("./src/routes/jwtAuth"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const deserializeUser_1 = __importDefault(require("./src/middlewares/deserializeUser"));
const cookieParser = require('cookie-parser');
const bootstrap = async () => {
    await typeorm_1.createConnection({
        url: pool_1.default,
        type: "postgres",
        //todo enable
        // ssl: {
        //     rejectUnauthorized: false,
        // },
        entities: [User_1.default],
        synchronize: true
    });
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use(cookieParser());
    if (process.env.NODE_ENV === "production") {
        app.use(express_1.default.static(path_1.default.join(__dirname, "client/build")));
    }
    app.use(deserializeUser_1.default);
    routes_1.default(app);
    app.use(jwtAuth_1.default);
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "client/build/index.html"));
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Server started on port " + PORT));
};
bootstrap();
