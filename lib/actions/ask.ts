import { stdout } from "@/stdout";
import { clear } from "console";
import config from "@/config";
import puppeteer from "puppeteer";
import TurndownService from "turndown";

const turndownService = new TurndownService();

async function waitForResponse(): Promise<string> {
  const removeZeroWidthSpace = (str: string) =>
    str.replace(/[\u200B-\u200D\uFEFF]/g, "");

  const CONVERSTATION_ITEMS_SELECTOR =
    "div[class*='ConversationItem__Message']";
  const CONVERSTATION_ITEMS_LAST_SELECTOR =
    "div:nth-child(2) div[class*='request'";
  const CONVERSTATION_LOADING_STATE_VALUE = "<p></p>";
  const CONVERSTATION_CHECK_INTERVAL = 800;

  const conversationItems = document.querySelectorAll(
    CONVERSTATION_ITEMS_SELECTOR
  );
  const lastItem = conversationItems[
    conversationItems.length - 1
  ].querySelector(CONVERSTATION_ITEMS_LAST_SELECTOR);

  if (!lastItem) return "";

  return await new Promise((resolve) => {
    let last = lastItem.innerHTML;

    const interval = setInterval(() => {
      if (
        last === lastItem.innerHTML &&
        removeZeroWidthSpace(last) !== CONVERSTATION_LOADING_STATE_VALUE
      ) {
        clearInterval(interval);
        resolve(last);
      }
      last = lastItem.innerHTML;
    }, CONVERSTATION_CHECK_INTERVAL);
  });
}

export default async function (question: string) {
  const start = Date.now();
  const loadingMsg = new stdout.loading("Connecting to ChatGPT...");
  loadingMsg.start();

  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: "/tmp/askdata",
  });

  const page = await browser.newPage();
  await page.goto(config.CHAT_GPT_URL, {
    waitUntil: "domcontentloaded",
  });

  loadingMsg.setMessage(`ChatGPT is ready! [${Date.now() - start}ms]`);

  const promptArea = await page.$(config.PROMPT_AREA_SELECTOR);
  const cta = await page.$(config.PROMPT_CTA_SELECTOR);

  if (!promptArea || !cta) {
    throw new Error("Could not find prompt area");
  }

  await promptArea.type(question);
  await cta.click();

  loadingMsg.setMessage(`thinking... [${Date.now() - start}ms]`);

  const lastMessage: string = await page.evaluate(waitForResponse);

  loadingMsg.stop();
  clear();

  stdout.success("------------------------- Answer -------------------------");
  stdout.log(turndownService.turndown(lastMessage));

  browser.close();
  process.exit(0);
}
