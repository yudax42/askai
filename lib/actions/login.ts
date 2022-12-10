import enquirer from "enquirer";
import fs from "fs";
import os from "os";
import path from "path";
import stdout from "@/stdout";

export default async function (): Promise<void> {
  try {
    const response: Record<string, string> = await enquirer.prompt({
      type: "text",
      name: "token",
      message: "Enter your ChatGPT token",
    });

    if (!response.token) {
      throw new Error("No token provided");
    }

    const tokenPath = path.join(os.homedir(), ".chatgpt");
    if (!fs.existsSync(tokenPath)) {
      fs.mkdirSync(tokenPath);
    }
    fs.writeFileSync(path.join(tokenPath, "token"), response.token, "utf-8");

    stdout.success("Successfully logged in!");

    process.exit(0);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      process.exit(0);
    }
  }
}
