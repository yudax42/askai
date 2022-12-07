import stdout from "@/stdout";
import config from "@/config";
import { unlinkSync } from "fs";

export default async function (): Promise<void> {
  try {
    const msg = new stdout.loading("Logging out...");
    msg.start();

    unlinkSync(config.TOKEN_PATH);

    msg.setMessage("Logged out successfully");
    msg.stop();
  } catch (e) {
    if (e instanceof Error) {
      stdout.error(e.message);
      process.exit(0);
    }
  }
}
