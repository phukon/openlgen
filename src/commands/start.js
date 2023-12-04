import createLogger from '../logger.js';

const logger = createLogger('commands: start');

export function start(config) {
  logger.debug('Received configuration', config.fullname);
}