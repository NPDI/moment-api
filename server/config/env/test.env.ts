/* tslint:disable */
import * as path from 'path';


module.exports = {
  env: 'development',
  db: 'moment_test',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  serverPort: 3001,
  pgPort: 5432,
  dbURL: 'postgres://postgres:postgres@localhost:5432/moment_test',
  secret: 'S3cr3t',
  uploadPath: path.join(__dirname, '..', '..', '..', 'upload'),
};
