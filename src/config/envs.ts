import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  SERVER_PORT: get('SERVER_PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').required().asString(),
}