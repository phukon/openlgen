import debug from 'debug';
import pc from 'picocolors';


export default function createLogger(name) {
  return {
    log: (...args) => console.log(pc.gray(...args)),
    warning: (...args) => console.log(pc.yellow(...args)),
    highlight: (...args) => console.log(pc.bgCyan(...args)),
    debug: debug(name)
  };
};
