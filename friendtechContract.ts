import { ethers } from "ethers";
import { contractABI } from "./contractABI";
import "dotenv/config";

const url = process.env.WEBSOCKET_PROVIDER;

if (!url) {
  throw new Error("WEBSOCKET_PROVIDER is not defined.");
}

const contractAddress = "0x53167401aeebFf5677C31E1DDA945628422D7Ed2";
const provider = new ethers.WebSocketProvider(url!);

provider.on("error", (error) => {
  console.error("WebSocketProvider error:", error);
});

setInterval(async () => {
  try {
    await provider.getBlockNumber();
    console.log("Heartbeat successful.");
  } catch (error) {
    console.error("Heartbeat failed:", error);
  }
}, 2 * 60 * 1000);

export const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);
