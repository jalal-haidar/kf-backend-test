import { SiteInfo } from '../models/siteInfo';
import httpClient from '../utils/httpClient';
import logger from '../utils/logger';

export const getSiteInfo = async (siteId: string): Promise<SiteInfo> => {
  try {
    const response = await httpClient.get<SiteInfo>(`/site-info/${siteId}`);
    if (!response.data) {
      throw new Error(`No data returned for siteId: ${siteId}`);
    }
    return response.data;
  } catch (error) {
    logger.error(`Error fetching site info for siteId: ${siteId}`, error);
    throw error;
  }
};
