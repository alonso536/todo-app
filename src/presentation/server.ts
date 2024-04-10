import express, { Router } from 'express';

interface Options {
  serverPort: number;
  publicPath: string;
  routes: Router;
}

export class Server {
  private app = express();
  private serverPort: number;
  private publicPath: string;
  private routes: Router;

  constructor(options: Options) {
    const { serverPort, publicPath, routes } = options;
    this.serverPort = serverPort;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(this.publicPath));

    this.app.use(this.routes);

    this.app.listen(this.serverPort, ()  => {
      console.log(`Server running on port ${this.serverPort}`);
    });
  }
}