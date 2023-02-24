import { client } from './seeds/constants.js';
import { reset } from './seeds/index.js';

reset()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
