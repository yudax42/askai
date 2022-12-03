import config from "@/config";
import puppeteer, { Browser, Page } from "puppeteer";

export default async function (): Promise<{
  page: Page;
  browser: Browser;
}> {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: config.PUPPETER_DATA_DIR,
  });

  const page = await browser.newPage();
  await page.goto(config.CHAT_GPT_URL, {
    waitUntil: "domcontentloaded",
  });
  return { page, browser };
}
