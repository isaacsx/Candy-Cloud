import loadRoutes from "../handle/Routes";
import express from "express";

export class Server {
  constructor(serverOptions: ServerOptions) {
    Object.assign(this, serverOptions);
  }

  public start() {
    loadRoutes(this.app);
    this.useMiddlewares();
    this.app.listen(this.options.port, () => console.log("Server is running!"));
  }

  private useMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.text({ type: "*/*" }));
  }

  private app = express();

  private options: ServerOptions = {
    port: 3000,
  };
}

type ServerOptions = {
  port: number;
};
