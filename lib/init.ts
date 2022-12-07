import { ChatGPTAPI } from "chatgpt";
import fs from "fs";
import os from "os";
import path from "path";

async function initChatGPT() {
  if (!fs.existsSync(path.join(os.homedir(), ".chatgpt"))) {
    fs.mkdirSync(path.join(os.homedir(), ".chatgpt"));
  }

  if (!fs.existsSync(path.join(os.homedir(), ".chatgpt", "token"))) {
    throw new Error(
      "No token found. Please run `chatgpt login` to login to ChatGPT"
    );
  }

  const token = fs.readFileSync(
    path.join(os.homedir(), ".chatgpt", "token"),
    "utf-8"
  );

  const api = new ChatGPTAPI({
    sessionToken: token,
  });

  await api.ensureAuth();

  return api;
}

export default initChatGPT;
