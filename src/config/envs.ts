import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').required().asString(),
  MYSQL_URL: get('MYSQL_URL').required().asString(),
  MYSQL_USER: get('MYSQL_USER').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
}