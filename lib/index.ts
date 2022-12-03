import loginAction from "@/actions/login";
import askAction from "@/actions/ask";
import liveAction from "@/actions/live";
import logoutAction from "@/actions/logout";
import { cac } from "cac";
const cli = cac("askai");

cli.command("login", "Login to your chatGPT account").action(loginAction);
cli.command("logout", "Logout of your chatGPT account").action(logoutAction);
cli.command("live", "Open Live chat session").action(liveAction);

cli.on("command:!", () => {
  if (cli.args[0]) {
    askAction(cli.args[0]);
  }
});
cli.command("<question>", "Ask a question");

cli.help();
cli.parse();
