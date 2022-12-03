import config from "@/config";
import puppeteer from "puppeteer";

export default async function (): Promise<void> {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
      userDataDir: config.PUPPETER_DATA_DIR,
    });
    const page = await browser.newPage();

    await page.goto(config.CHAT_GPT_URL, {
      waitUntil: "domcontentloaded",
    });

    browser.on("close", () => {
      process.exit(0);
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      process.exit(0);
    }
  }
}
