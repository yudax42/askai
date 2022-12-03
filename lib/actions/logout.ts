import stdout from "@/stdout";
import rmrf from "rmrf";
import config from "@/config";

export default async function (): Promise<void> {
  try {
    const msg = new stdout.loading("Logging out...");
    msg.start();
    rmrf(config.PUPPETER_DATA_DIR);
    msg.setMessage("Logged out successfully");
    msg.stop();
  } catch (e) {
    if (e instanceof Error) {
      stdout.error(e.message);
    }
  }
}
