import { Request, Response } from "express";
import { Route } from "../class/Route";

export class MainRoute extends Route {
  constructor() {
    super({ path: "/", method: "get" });
  }

  public run(req: Request, res: Response) {
    return res.send("Hello World!");
  }
}
