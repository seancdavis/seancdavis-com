import chalk from "chalk";

export class Logger {
  success(msg: string) {
    console.log(chalk.green.bold("[success]"), msg);
  }

  debug(msg: string) {
    if (process.env.DEBUG) {
      console.log(chalk.blue.bold("[debug]"), msg);
    }
  }

  error(msg: string) {
    console.log(chalk.red.bold("[error]"), msg);
  }
}
