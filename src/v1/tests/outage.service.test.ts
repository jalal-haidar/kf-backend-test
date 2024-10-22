import { Outage } from '../models/outage';
import { SiteInfo } from '../models/siteInfo';
import { attachDeviceNames, filterOutages } from '../services/outage.service';

describe('Outage Service', () => {
  const outages: Outage[] = [
    { id: '1', begin: '2022-02-01T00:00:00Z', end: '2022-02-10T00:00:00Z' },
    { id: '2', begin: '2021-12-01T00:00:00Z', end: '2022-01-10T00:00:00Z' },
    { id: '3', begin: '2022-05-01T00:00:00Z', end: '2022-05-15T00:00:00Z' }
  ];

  const siteInfo: SiteInfo = {
    id: 'norwich-pear-tree',
    name: 'Norwich Pear Tree',
    devices: [
      { id: '1', name: 'Device A' },
      { id: '3', name: 'Device C' }
    ]
  };

  it('should filter outages after 2022-01-01', () => {
    const result = filterOutages(outages, siteInfo);
    expect(result.length).toBe(2);  
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('3');
  });

  it('should filter out outages before 2022-01-01', () => {
    const result = filterOutages(outages, siteInfo);
    const filteredOutageIds = result.map(outage => outage.id);
    expect(filteredOutageIds).not.toContain('2');  
  });

  it('should attach device names to the filtered outages', () => {
    const filteredOutages = filterOutages(outages, siteInfo);
    const result = attachDeviceNames(filteredOutages, siteInfo);

    expect(result[0].name).toBe('Device A');  
    expect(result[1].name).toBe('Device C');  
  });

  it('should handle missing device names gracefully', () => {
    const missingDeviceSiteInfo: SiteInfo = {
      ...siteInfo,
      devices: [{ id: '1', name: 'Device A' }] 
    };
  
    const filteredOutages = filterOutages(outages, missingDeviceSiteInfo);
    const result = attachDeviceNames(filteredOutages, missingDeviceSiteInfo);
  
    expect(result.length).toBe(1);  
  
    expect(result[0].name).toBe('Device A'); 
  
    expect(result[1]).toBeUndefined();  
  });
  

  it('should return empty array if no outages match after filtering', () => {
    const noMatchOutages: Outage[] = [
      { id: '4', begin: '2021-02-01T00:00:00Z', end: '2021-02-10T00:00:00Z' }
    ];
    const result = filterOutages(noMatchOutages, siteInfo);
    expect(result.length).toBe(0);  
  });

  it('should return empty array if no devices match the site info', () => {
    const unmatchedSiteInfo: SiteInfo = {
      id: 'norwich-pear-tree',
      name: 'Norwich Pear Tree',
      devices: [{ id: '99', name: 'Unknown Device' }]  
    };

    const result = filterOutages(outages, unmatchedSiteInfo);
    expect(result.length).toBe(0);  
  });
});
