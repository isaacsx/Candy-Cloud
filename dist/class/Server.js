"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const Routes_1 = __importDefault(require("../handle/Routes"));
const express_1 = __importDefault(require("express"));
class Server {
    constructor(serverOptions) {
        this.app = (0, express_1.default)();
        this.options = {
            port: 3000,
        };
        Object.assign(this, serverOptions);
    }
    start() {
        (0, Routes_1.default)(this.app);
        this.useMiddlewares();
        this.app.listen(this.options.port, () => console.log("Server is running!"));
    }
    useMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.text({ type: "*/*" }));
    }
}
exports.Server = Server;
