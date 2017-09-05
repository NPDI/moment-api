/* tslint:disable */
import * as path from 'path';

module.exports = {
  env: 'production',
  db: 'det4547oc9jri',
  dialect: 'postgres',
  username: 'ppturztezlnzco',
  password: '18c48962c3f36fab1c12ba5df47379b46f7cb39773694a3d97bc21ca52bc5f64',
  host: 'localhost',
  serverPort: process.env.PORT,
  pgPort: 5432,
  dbURL: 'postgres://ppturztezlnzco:18c48962c3f36fab1c12ba5df47379b46f7cb39773694a3d97bc21ca52bc5f64@ec2-107-22-171-11.compute-1.amazonaws.com:5432/det4547oc9jri',
  secret: 'S3cr3t',
  uploadPath: path.join(__dirname, '..', '..', '..', 'upload'),
};
