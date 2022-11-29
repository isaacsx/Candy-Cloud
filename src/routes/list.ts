import { existsSync, readdirSync, readFileSync } from "node:fs";
import { Request, Response } from "express";
import { Route } from "../class/Route";

export class ListRoute extends Route {
    constructor() {
        super({ path: "/list", method: "get" });
    }

    public run(req: Request, res: Response) {
        const { hwid } = req.query;
        if (!hwid || !hwid.length || hwid.length < 18)
            return res.json({ error: "No hwid provided" });

        if (!existsSync(`./uploads/${hwid}`))
            return res.json({ scripts: [] });

        const files = readdirSync(`./uploads/${hwid}`);
        const scripts: any[] = [];

        if (files.length === 0)
            return res.json({ scripts });

        files //
            .filter((file) => file.endsWith('.lua'))
            .map((file) => {
                console.log(file);
                const script = readFileSync(`./uploads/${hwid}/${file}`, 'utf-8');
                console.log(script);
                const scriptData = JSON.parse(
                    readFileSync(`./uploads/${hwid}/.${file}.json`, 'utf-8')
                );

                scripts.push({
                    name: file.replace('.lua', ''),
                    content: script,
                    date: scriptData.date
                });
        });

        return res.json({ scripts });
    }
}
