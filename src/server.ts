import 'reflect-metadata';
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './routes/routes';




const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);



AppDataSource.initialize().then(async () => {
    console.log("Database OK !");
    app.listen(Number(process.env.PORT), () => {
        console.log(`Server started on port ${process.env.PORT}`);
    })
})
