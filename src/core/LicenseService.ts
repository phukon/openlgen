import { fetchFromGitHub } from '../utils/apiUtils';
import { LicenseEntry, LicenseDetails } from '../types';

export class LicenseService {
  static readonly GITHUB_LICENSE_API = 'https://api.github.com/licenses';

  static async fetchLicenses(): Promise<LicenseEntry[]> {
    const data = await fetchFromGitHub(this.GITHUB_LICENSE_API);
    return data.map((entry: any) => ({
      name: entry.spdx_id,
      value: entry.spdx_id,
      description: entry.name,
    }));
  }

  static async generateLicense({
    license,
    fullname,
    year,
  }: LicenseDetails): Promise<string> {
    const data = await fetchFromGitHub(`${this.GITHUB_LICENSE_API}/${license}`);
    return this.replacePlaceholders(data.body, { fullname, year });
  }

  static replacePlaceholders(
    text: string,
    { fullname, year }: { fullname: string; year?: number },
  ): string {
    return text
      .replace(/\[fullname\]/g, fullname)
      .replace(/\[year\]/g, String(year || new Date().getUTCFullYear()));
  }
}
