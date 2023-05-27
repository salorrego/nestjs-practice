import path from 'path';
import npm from 'npm';
import util from 'util';
import * as dockerCompose from 'docker-compose';
import isCI from 'is-ci';
import { getMigrations, truncateTable } from '../test-helpers';

export default async function tearDown(): Promise<void> {
  if (process.env.noInfrastructure) {
    return;
  }

  // ⛔️ Erase all DB data
  await truncateTable('books');

  // ✋🏻 Run migrations revert only on CI env
  if (isCI) {
    // ⏮ DB migrations revert
    const migrations = await getMigrations();

    const npmLoadAsPromise = util.promisify(npm.load);
    await npmLoadAsPromise();
    const npmCommandAsPromise = util.promisify(npm.commands['run-script']);

    const migrationsToRun = [];
    for (let migration = 0; migration < migrations.rowCount; migration += 1) {
      migrationsToRun.push(
        npmCommandAsPromise(['typeorm:revert']),
      );
    }

    await Promise.all(migrationsToRun);

    // ✋🏻 Stop docker container
    dockerCompose
      .down({
        cwd: path.join(path.dirname(__filename), './docker'),
        log: true,
      })
      // eslint-disable-next-line promise/always-return
      .then((res) => {
        console.log('DOCKER COMPOSE DOWN SUCCESFULLY: ', res);
      })
      .catch((err) => {
        console.log('DOCKER COMPOSE DOWN ERROR: ', err);
      });
  }
}
