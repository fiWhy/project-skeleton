import { client } from './seeds/constants.js';
import { main } from './seeds/index.js';

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
