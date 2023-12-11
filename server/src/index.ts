//biến môi trường
require('dotenv').config()
import 'reflect-metadata'
//import thuư viện express
import express from 'express'

import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Post } from './entities/Post'

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        logging: true,
        synchronize: true,
        entities: [User, Post]
    })

    const app = express()

    app.listen(4000, () => console.log(`Server listening on port 4000`))

}

//catch error
main().catch(error => console.log(error));