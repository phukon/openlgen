import { cosmiconfigSync } from 'cosmiconfig';
import fs from 'fs';
import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
import createLogger from '../logger.js';

const ajv = new Ajv();
const licenseLoader = cosmiconfigSync('license');
const nameLoader = cosmiconfigSync('author');
const logger = createLogger('config: mgr');

/*
Import assertion are experimental. Therfore I tried loading the JSON from the filesystem synchronously.

 ---Use this code beloew if you want to use import assertions---
  import schema from './schema.json' assert { type: 'json' };
*/

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const schema = loadJSON('./schema.json');

export async function getConfig() {
  const lsc = licenseLoader.search(process.cwd());
  const auth = nameLoader.search(process.cwd())

  if (!lsc) {
    logger.warning('Please have a valid license field.');
     process.exit(1)
  } else if (auth.config.trim().length < 1) {
    logger.warning('No author defined in package.json');
    process.exit(1)
  } else {
    const isLValid = ajv.validate(schema, lsc.config);
    const isAValid = ajv.validate(schema, auth.config);
    if (!isLValid || !isAValid) {
      logger.warning('Invalid configuration was supplied');
      console.log();
      console.log(betterAjvErrors(schema, `${lsc.config} ${auth.config}`, ajv.errors));
      process.exit(1);
    }
    logger.highlight(`\nConfiguration found!`);
    return { license: lsc.config, fullname: auth.config }
  }
}
