import cron from "node-cron";
import { fetchEosActions } from "../services/service";

export const startCronJob = () => {
  cron.schedule("* * * * *", async () => {
    await fetchEosActions();
  });
};
