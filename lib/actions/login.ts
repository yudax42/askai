import config from "@/config";
import puppeteer from "puppeteer";

export default async function (): Promise<void> {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    userDataDir: "/tmp/askdata",
  });
  const page = await browser.newPage();

  await page.goto(config.CHAT_GPT_URL, {
    waitUntil: "domcontentloaded",
  });

  browser.on("close", () => {
    process.exit(0);
  });
}
