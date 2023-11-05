"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const master_router_1 = __importDefault(require("./routers/master-router"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = master_router_1.default;
    }
}
exports.Server = Server;
const corsOptions = {
    origin: [
        "http://localhost:8000",
        "https://localhost:8000",
        "http://localhost:4200",
        "https://localhost:4200",
    ]
};
const server = new Server();
const port = process.env.PORT;
server.app.use((0, cors_1.default)(corsOptions));
server.app.use(body_parser_1.default.json());
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use('/api', server.router);
server.app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
