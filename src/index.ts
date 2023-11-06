import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import MasterRouter from './routers/master-router'

dotenv.config();

export class Server{
    public app: Express = express();
    public router = MasterRouter;
}

const server = new Server();
const port = process.env.PORT;

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.app.use('/api', server.router);

server.app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});