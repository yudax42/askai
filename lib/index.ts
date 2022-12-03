import { cac } from "cac";
const cli = cac("ask");
import loginAction from "@/actions/login";
import askAction from "@/actions/ask";

cli.command("login", "Login to your chatGPT account").action(loginAction);
cli.on("command:*", () => {
  askAction(cli.args[0]);
});

cli.help();
cli.parse();
