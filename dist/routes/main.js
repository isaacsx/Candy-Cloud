"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoute = void 0;
const Route_1 = require("../class/Route");
class MainRoute extends Route_1.Route {
    constructor() {
        super({ path: "/", method: "get" });
    }
    run(req, res) {
        return res.send("Hello World!");
    }
}
exports.MainRoute = MainRoute;
