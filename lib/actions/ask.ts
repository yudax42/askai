import stdout from "@/stdout";
import waitForResponse from "@/core/gptResponse";
import gptAsk from "@/core/gptAsk";
import gptChat from "@/core/gptChat";
import TurndownService from "turndown";
import { clear } from "console";

const turndownService = new TurndownService();

export default async function (question: string) {
  const start = Date.now();
  const loadingMsg = new stdout.loading("Connecting to ChatGPT...");
  loadingMsg.start();

  const { page, browser } = await gptChat();

  loadingMsg.setMessage(`ChatGPT is ready! [${Date.now() - start}ms]`);

  await gptAsk(page, question);

  loadingMsg.setMessage(`thinking... [${Date.now() - start}ms]`);

  const lastMessage: string = await page.evaluate(waitForResponse);

  loadingMsg.stop();
  clear();

  stdout.success("------------------------- Answer -------------------------");
  stdout.log(turndownService.turndown(lastMessage));

  browser.close();
  process.exit(0);
}
