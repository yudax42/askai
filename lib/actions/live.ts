import prompts from "prompts";
import TurndownService from "turndown";
import waitForResponse from "@/core/gptResponse";
import gptChat from "@/core/gptChat";
import gptAsk from "@/core/gptAsk";
import stdout from "@/stdout";
import { clear } from "console";

const turndownService = new TurndownService();

export default async function (options: Record<string, any>) {
  try {
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

      await gptAsk(page, question, options.description);

      const lastMessage: string = await page.evaluate(waitForResponse);

      stdout.log(turndownService.turndown(lastMessage));
    } while (true);
  } catch (e) {
    if (e instanceof Error) {
      stdout.error(e.message);
      process.exit(0);
    }
  }
}
