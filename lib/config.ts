export default {
  CHAT_GPT_URL: "https://chat.openai.com",
  PUPPETER_DATA_DIR: "/tmp/askai",
  PROMPT_AREA_SELECTOR:
    "div[class*='PromptTextarea__TextareaWrapper'] textarea",
  PROMPT_CTA_SELECTOR: "button[class*='PromptTextarea__PositionSubmit']",
  LOGIN_PAGE_SELECTOR: "div[class*='AuthPage']",
  NO_DESCRIPTION_MODE_PROMPT: `I will type a question and  want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. My first question is:`,
};
