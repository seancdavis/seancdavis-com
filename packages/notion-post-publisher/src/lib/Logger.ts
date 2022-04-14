import chalk from "chalk";

export class Logger {
  success(msg: string) {
    console.log(chalk.green.bold("[success]"), msg);
  }
}
