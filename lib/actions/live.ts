import enquirer from "enquirer";
import stdout from "@/stdout";
import { clear } from "console";
import initChatGPT from "@/init";
import cliMd from "cli-markdown";

export default async function (options: Record<string, any>) {
  try {
    const chatGPT = await initChatGPT();
    const loadingMsg = new stdout.loading("Connecting to ChatGPT...");
    loadingMsg.start();

    loadingMsg.stop();
    clear();

    do {
      const { question }: Record<string, any> = await enquirer.prompt({
        type: "text",
        name: "question",
        message: "askai >",
      });

      if (question == "exit") {
        process.exit(0);
      }

      if (question == "clear") {
        clear();
        continue;
      }

      const response = await chatGPT.sendMessage(question);

      stdout.log(cliMd(response));
    } while (true);
  } catch (e) {
    if (e instanceof Error) {
      stdout.error(e.message);
      process.exit(0);
    }
  }
}
