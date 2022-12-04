import config from "@/config";
import { clear } from "console";
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

  const hasSeenOnboarding = await page.evaluate(() => {
    return localStorage.getItem("oai/apps/hasSeenOnboarding/chat");
  });

  if (!hasSeenOnboarding) {
    await page.evaluate(() => {
      localStorage.setItem("oai/apps/hasSeenOnboarding/chat", "true");
    });
    await page.reload();
  }

  const isLoginPage = await page.$(config.LOGIN_PAGE_SELECTOR);
  if (isLoginPage) {
    clear();
    browser.close();
    throw new Error("Please login first by running `askai login`");
  }

  return { page, browser };
}
