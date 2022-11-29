import { Application } from "express";
import { readdirSync } from "node:fs";

export default function (app: Application) {
  readdirSync("./dist/routes").forEach(async (file) => {
    const Route = await import(`../routes/${file}`);
    const keys = Object.keys(Route);
    const route = new Route[keys[0]]();

    //@ts-ignore
    app[route.method](route.path, route.run);
  });
}
