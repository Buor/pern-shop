require('dotenv').config()

const devConfig = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const proConfig = process.env.DATABASE_URL //heroku addons

const pool = process.env.NODE_ENV === "production" ? proConfig : devConfig
export default pool;
