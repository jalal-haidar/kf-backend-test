import { Outage } from '../models/outage';
import { SiteInfo } from '../models/siteInfo';
import httpClient from '../utils/httpClient';
import logger from '../utils/logger';

export const getOutages = async (): Promise<Outage[]> => {
  try {
    const response = await httpClient.get<Outage[]>('/outages');
    if (!response.data || response.data.length === 0) {
      throw new Error('No outages returned from the API');
    }
    return response.data;
  } catch (error) {
    logger.error('Error fetching outages:', error);
    throw new Error('Failed to fetch outages');
  }
};

export const filterOutages = (outages: Outage[], siteInfo: SiteInfo): Outage[] => {
  const filteredOutages = outages
    .filter(outage => new Date(outage.begin) >= new Date('2022-01-01T00:00:00.000Z'))
    .filter(outage => siteInfo.devices.some(device => device.id === outage.id));

  if (filteredOutages.length === 0) {
    logger.warn('No matching outages found for the specified site');
  }

  return filteredOutages;
};

export const attachDeviceNames = (outages: Outage[], siteInfo: SiteInfo): any[] => {
  return outages.map(outage => {
    const device = siteInfo.devices.find(d => d.id === outage.id);
    return { 
      ...outage, 
      name: device?.name || 'Unknown Device'
    };
  });
};

export const postFilteredOutages = async (siteId: string, outages: any[]): Promise<void> => {
  try {
    if (outages.length === 0) {
      logger.warn(`No outages to post for site ${siteId}`);
      return;
    }

    await httpClient.post(`/site-outages/${siteId}`, outages);
    logger.info(`Successfully posted ${outages.length} outages for site ${siteId}`);
  } catch (error) {
    logger.error(`Error posting outages for site ${siteId}:`, error);
    throw new Error('Failed to post outages');
  }
};
