import config from "@/config";
import { Page } from "puppeteer";

export default async function (
  page: Page,
  question: string,
  descriptionMode?: boolean
) {
  const promptArea = await page.$(config.PROMPT_AREA_SELECTOR);
  const cta = await page.$(config.PROMPT_CTA_SELECTOR);

  if (!promptArea || !cta) {
    throw new Error("Could not find prompt area");
  }

  if (!descriptionMode) {
    question = config.NO_DESCRIPTION_MODE_PROMPT + " " + question;
  }

  await promptArea.type(question);
  await cta.click();
}
