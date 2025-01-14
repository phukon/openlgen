import { OpenlgenError, OpenlgenErrorCodes } from '../../errors/OpenlgenError';
import { LicenseTemplate } from '../../types';
import { Logger } from '../../utils/logger';

export class LicenseFetcher {
  private readonly GITHUB_API_URL = 'https://api.github.com/licenses';
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async fetchLicenseList(): Promise<LicenseTemplate[]> {
    try {
      const response = await fetch(this.GITHUB_API_URL);
      if (!response.ok) {
        throw new OpenlgenError(
          `HTTP error! Status: ${response.status}`,
          OpenlgenErrorCodes.API_ERROR
        );
      }
      return await response.json();
    } catch (error) {
      if (error instanceof OpenlgenError) throw error;
      
      throw new OpenlgenError(
        'Failed to fetch licenses',
        OpenlgenErrorCodes.NETWORK_ERROR,
        error
      );
    }
  }

  async fetchLicenseContent(licenseId: string): Promise<LicenseTemplate> {
    try {
      const response = await fetch(`${this.GITHUB_API_URL}/${licenseId}`);
      if (!response.ok) {
        throw new OpenlgenError(
          `Failed to fetch license: ${licenseId}`,
          OpenlgenErrorCodes.API_ERROR
        );
      }
      return await response.json();
    } catch (error) {
      if (error instanceof OpenlgenError) throw error;
      
      throw new OpenlgenError(
        `License content fetch failed for ${licenseId}`,
        OpenlgenErrorCodes.NETWORK_ERROR,
        error
      );
    }
  }
}