import { processOutages } from "./v1/controllers/outages.controller";

(async () => {
  await processOutages();
})();
