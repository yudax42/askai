import prompts from "prompts";
import waitForResponse from "@/core/gptResponse";
import gptChat from "@/core/gptChat";
import gptAsk from "@/core/gptAsk";
import stdout from "@/stdout";
import TurndownService from "turndown";
import { clear } from "console";

const turndownService = new TurndownService();

export default async function () {
  const loadingMsg = new stdout.loading("Connecting to ChatGPT...");
  loadingMsg.start();
  const { page, browser } = await gptChat();
  loadingMsg.stop();
  clear();

  do {
    const { question } = await prompts({
      type: "text",
      name: "question",
      message: "",
    });

    if (question == "exit") {
      browser.close();
      process.exit(0);
    }

    if (question == "clear") {
      clear();
      continue;
    }

    await gptAsk(page, question);

    const lastMessage: string = await page.evaluate(waitForResponse);

    stdout.log(turndownService.turndown(lastMessage));
  } while (true);
}
