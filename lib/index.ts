import { cac } from "cac";
const cli = cac("ask");
import loginAction from "@/actions/login";
import askAction from "@/actions/ask";
import liveAction from "@/actions/live";

cli.command("login", "Login to your chatGPT account").action(loginAction);
cli.command("live", "Open Live chat session").action(liveAction);
cli.on("command:*", async () => {
  if (cli.args[0]) {
    await askAction(cli.args[1]);
  }
});
cli.command("<question>", "Ask a question");

cli.help();
cli.parse();
