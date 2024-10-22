import { attachDeviceNames, filterOutages, getOutages, postFilteredOutages } from "../services/outage.service";
import { getSiteInfo } from "../services/site.service";

export const processOutages = async (): Promise<void> => {
  const siteId = 'norwich-pear-tree';
  try {
    const outages = await getOutages();
    const siteInfo = await getSiteInfo(siteId);

    const filteredOutages = filterOutages(outages, siteInfo);
    const outagesWithNames = attachDeviceNames(filteredOutages, siteInfo);

    await postFilteredOutages(siteId, outagesWithNames);
    console.log('Successfully processed outages');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing outages:', error.message);
    } else {
      console.error('Error processing outages:', error);
    }
  }
};
