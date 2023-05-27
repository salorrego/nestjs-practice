// Set ENV variables
process.env.DEVICE_PORT = '3333';
process.env.TYPEORM_PORT = '54320';
process.env.TYPEORM_HOST = 'localhost';
process.env.LOG_LEVEL = 'debug';

import npm from 'npm';
import util from 'util';
import { join, dirname } from 'path';
import * as dockerCompose from 'docker-compose';
import isPortReachable from 'is-port-reachable';
import { waitForPostgres } from '../test-helpers';

export default async function setup(): Promise<void> {
  // ✅ Best practice: Give to devs the possibility to avoid this steps
  if (process.argv.includes('--silent')) {
    process.env.LOG_ENABLED = 'false';
  }

  if (process.env.noInfrastructure) {
    return;
  }

  const isDBReachable = await isPortReachable(54320, {host: 'localhost'});
  if (!isDBReachable) {
    // 🏃🏻‍♂️ Run docker
    await dockerCompose.upAll({
      cwd: join(dirname(__filename), './docker'),
      log: true,
    });
  }

  // 😴 Wait for Postgres to be ready to accept connections
  await waitForPostgres();

  // 🏁 Apply DB migrations
  const npmLoadAsPromise = util.promisify(npm.load);
  await npmLoadAsPromise();
  const npmCommandAsPromise = util.promisify(npm.commands['run-script']);
  await npmCommandAsPromise(['db:migrate']);
  // 🌱 Seed anything you require
  // await npmCommandAsPromise(['seed']);
}
