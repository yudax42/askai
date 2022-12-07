import stdout from "@/stdout";
import { clear } from "console";
import initChatGPT from "@/init";

export default async function (question: string) {
  try {
    const loadingMsg = new stdout.loading("Connecting to ChatGPT...");
    loadingMsg.start();

    const chatGPT = await initChatGPT();
    const start = Date.now();

    loadingMsg.setMessage(`thinking... [${Date.now() - start}ms]`);

    const response = await chatGPT.sendMessage(question);

    loadingMsg.stop();
    clear();

    stdout.info("== Question ==");
    stdout.info("Question: " + question);
    stdout.success("== Answer ==");
    stdout.log(response);

    process.exit(0);
  } catch (e) {
    if (e instanceof Error) {
      stdout.error(e.message);
      process.exit(0);
    }
  }
}
