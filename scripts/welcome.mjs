import chalk from 'chalk';
import boxen from 'boxen';

const main = () => {
  console.log(
    boxen(
      `
${chalk.blue('Welcome to the project!')}
${chalk.white(
  'Firsly you need to set up client id (DOT_CLIENT_ID) and secret (DOT_CLIENT_SECRET) from console:'
)}
${chalk.white.underline('https://console.cloud.google.com/apis/credentials')}

${chalk.white.bold.underline(`Don't forget to setup postgres credentials!`)}
    `,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'classic',
        borderColor: 'blue'
      }
    )
  );
};

main();
