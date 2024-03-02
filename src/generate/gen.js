import { getConfig } from '../config/config-mgr.js';
import { start } from '../commands/start.js';

export async function autogen(entries, flag) {
  const config = await getConfig();
  start(config);
  entries.license = config.license.toLowerCase();
  entries.fullname = config.fullname;
  if (
    entries.license === 'BSD-2-Clause' ||
    entries.license === 'BSD-3-Clause' ||
    entries.license === 'MIT' ||
    entries.license === 'ISC'
  ) {
    flag = true;
    return {
      flag: flag,
      license: entries.license,
      fullname: entries.fullname
    };
  }
  
  return {
    flag: false,
    license: entries.license,
    fullname: entries.fullname
  };
}

