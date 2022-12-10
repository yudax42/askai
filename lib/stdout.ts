import kleur from "kleur";
import readline from "readline";
import spinners from "cli-spinners";

export default {
  log: (message: string) => {
    console.log(message);
  },
  error: (message: string) => {
    console.log(kleur.bold().red(message));
  },
  info: (message: string) => {
    console.log(kleur.bold().blue(message));
  },
  warn: (message: string) => {
    console.log(kleur.bold().yellow(message));
  },
  success: (message: string) => {
    console.log(kleur.bold().green(message));
  },
  loading: class {
    message: string;
    spinnerIndex: number;
    spinnerFrames = spinners.dots10.frames;
    interval: any;
    constructor(message: string) {
      this.message = message;
      this.spinnerIndex = 0;
    }
    start() {
      this.interval = setInterval(() => {
        this.spinnerIndex = (this.spinnerIndex + 1) % this.spinnerFrames.length;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(
          kleur.gray(`${this.spinnerFrames[this.spinnerIndex]} ${this.message}`)
        );
      }, spinners.dots10.interval);
    }
    stop() {
      clearInterval(this.interval);
    }
    setMessage(message: string) {
      this.message = message;
    }
  },
};
