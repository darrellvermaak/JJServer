import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';

import MasterRouter from './routers/master-router'

dotenv.config();

export class Server{
    public app: Express = express();
    public router = MasterRouter;
}

const corsOptions: CorsOptions = {
    origin: [
        "http://localhost:8000",
        "https://localhost:8000",
        "http://localhost:4200",
        "https://localhost:4200",
    ]
}

const server = new Server();
const port = process.env.PORT;

server.app.use(cors(corsOptions));
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));

server.app.use('/api', server.router);

server.app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});