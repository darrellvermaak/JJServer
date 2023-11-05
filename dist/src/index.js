"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const master_router_1 = __importDefault(require("./routers/master-router"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = master_router_1.default;
    }
}
exports.Server = Server;
const server = new Server();
const port = process.env.PORT;
server.app.use(body_parser_1.default.json());
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use('/api', server.router);
server.app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
