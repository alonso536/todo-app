import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(async () => {
  main();
})();


async function main() {
  const server = new Server({
    serverPort: envs.SERVER_PORT,
    publicPath: envs.PUBLIC_PATH,
  });

  server.start();
}