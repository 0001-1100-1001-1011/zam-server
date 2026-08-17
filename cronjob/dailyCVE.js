import cron from "node-cron";
import { fetchLatestCVEs, postCVEs } from "../services/fetchLatestService.js";

/*
    ┌────────────── second (optional)
    │ ┌──────────── minute
    │ │ ┌────────── hour
    │ │ │ ┌──────── day of month
    │ │ │ │ ┌────── month
    │ │ │ │ │ ┌──── day of week
    │ │ │ │ │ │
    * * * * * *
 */
cron.schedule("* * 1 * * *", async () => {
  console.log("DAILY FETCH: STARTING");

  try {
    const vulnerabilities = await fetchLatestCVEs();
    await postCVEs(vulnerabilities);

    console.log("DAILY FETCH: SUCCESSFUL");
  } catch (error) {
    console.error("DAILY FETCH: FAILED", error);
  }
});
