import * as express from "express"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
            JWT_SECRET: string;
            PG_USER: string;
            PG_PASSWORD: string;
            PG_HOST: string;
            PG_DATABASE: string;
            PG_PORT: string;
        }
    }

    namespace Express {
        interface User {
            id: number
        }

        interface Request {
            user?: User
        }
    }
}

export {}