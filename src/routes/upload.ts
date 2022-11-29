import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { Request, Response } from "express";
import { Route } from "../class/Route";
import moment from "moment";

export class UploadRoute extends Route {
  constructor() {
    super({ path: "/upload", method: "post" });
  }

  public run(req: Request, res: Response) {
    const { body, query } = req;
    const { hwid, title } = query;

    if (!hwid || !hwid.length || hwid.length < 18)
      return res.json({ error: "No hwid provided" });

    if (!title || !title.length || title.length < 3)
      return res.json({ error: "Invalid title" });

    if (existsSync(`./uploads/${hwid}/${title}.lua`))
      return res.json({ error: "Script already exists" });

    const response = uploadScript(hwid as string, body, title as string);

    if (!response) return res.json({ error: "Failed to upload script" });

    return res.json({ message: "Script uploaded to cloud" });
  }
}

function uploadScript(hwid: string, script: string, title: string) {
  if (!existsSync(`./uploads/${hwid}`)) mkdirSync(`./uploads/${hwid}`);

  try {
    writeFileSync(`./uploads/${hwid}/${title}.lua`, script);
    writeFileSync(
      `./uploads/${hwid}/.${title}.lua.json`,
      JSON.stringify({
        date: moment(new Date()).format("MMM d, yyy"),
      })
    );
    return true;
  } catch {
    return false;
  }
}
