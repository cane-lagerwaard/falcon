#!/usr/bin/env node

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception: ', ex);
});
process.noDeprecation = true; // turns off that loadQuery clutter.

const Logger = require('@deity/falcon-logger');
const { start, build, size, test } = require('./../build-utils');

(async () => {
  const script = process.argv[2];

  try {
    switch (script) {
      case 'start': {
        await start();
        break;
      }

      case 'build': {
        await build();
        break;
      }
      case 'size': {
        await size();
        break;
      }

      case 'test': {
        test();
        break;
      }

      default:
        Logger.log(`Unknown script "${script}".`);
        Logger.log('Perhaps you need to update @deity/falcon-client?');
        process.exit();

        break;
    }
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
})();
