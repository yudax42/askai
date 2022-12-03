import loginAction from "@/actions/login";
import askAction from "@/actions/ask";
import liveAction from "@/actions/live";
import { cac } from "cac";
const cli = cac("askai");

cli.command("login", "Login to your chatGPT account").action(loginAction);
cli.command("live", "Open Live chat session").action(liveAction);

cli.on("command:!", () => {
  console.log(cli.args);
  if (cli.args[0]) {
    askAction(cli.args[0]);
  }
});
cli.command("<question>", "Ask a question");

cli.help();
cli.parse();
