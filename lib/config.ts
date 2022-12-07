import os from "os";
import path from "path";

export default {
  TOKEN_PATH: path.join(os.homedir(), ".chatgpt"),
  NO_DESCRIPTION_MODE_PROMPT: `I will type a question and  want you to only reply with the terminal output inside one unique code block, and nothing else. Do not write explanations. Do not type commands unless I instruct you to do so. My first question is:`,
};
