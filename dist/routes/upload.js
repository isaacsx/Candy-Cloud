"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoute = void 0;
const node_fs_1 = require("node:fs");
const Route_1 = require("../class/Route");
const moment_1 = __importDefault(require("moment"));
class UploadRoute extends Route_1.Route {
    constructor() {
        super({ path: "/upload", method: "post" });
    }
    run(req, res) {
        const { body, query } = req;
        const { hwid, title } = query;
        if (!hwid || !hwid.length || hwid.length < 18)
            return res.json({ error: "No hwid provided" });
        if (!title || !title.length || title.length < 3)
            return res.json({ error: "Invalid title" });
        if ((0, node_fs_1.existsSync)(`./uploads/${hwid}/${title}.lua`))
            return res.json({ error: "Script already exists" });
        const response = uploadScript(hwid, body, title);
        if (!response)
            return res.json({ error: "Failed to upload script" });
        return res.json({ message: "Script uploaded to cloud" });
    }
}
exports.UploadRoute = UploadRoute;
function uploadScript(hwid, script, title) {
    if (!(0, node_fs_1.existsSync)(`./uploads/${hwid}`))
        (0, node_fs_1.mkdirSync)(`./uploads/${hwid}`);
    try {
        (0, node_fs_1.writeFileSync)(`./uploads/${hwid}/${title}.lua`, script);
        (0, node_fs_1.writeFileSync)(`./uploads/${hwid}/.${title}.lua.json`, JSON.stringify({
            date: (0, moment_1.default)(new Date()).format("MMM d, yyy"),
        }));
        return true;
    }
    catch (_a) {
        return false;
    }
}
