import express from 'express';

interface Options {
  serverPort: number;
  publicPath: string;
}

export class Server {
  private app = express();
  private serverPort: number;
  private publicPath: string;

  constructor(options: Options) {
    const { serverPort, publicPath } = options;
    this.serverPort = serverPort;
    this.publicPath = publicPath;
  }

  async start() {
    this.app.use(express.static(this.publicPath));

    this.app.get('/api/v2/users', (req, res) => {
      const users = [
        { id: new Date().getTime(), email: 'user1@mail.com' },
        { id: new Date().getTime(), email: 'user2@mail.com' },
      ];

      return res.status(200).json(users);
    })

    this.app.listen(this.serverPort, ()  => {
      console.log(`Server running on port ${this.serverPort}`);
    });
  }
}