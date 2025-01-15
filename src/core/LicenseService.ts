import { fetchFromGitHub } from '../utils/apiUtils';
import { LicenseEntry, LicenseDetails } from '../types';

const GITHUB_LICENSE_API = 'https://api.github.com/licenses';



function replacePlaceholders(
  text: string,
  { fullname, year }: { fullname: string; year?: number },
): string {
  return text
    .replace(/\[fullname\]/g, fullname)
    .replace(/\[year\]/g, String(year || new Date().getUTCFullYear()));
}

export async function fetchLicenses(): Promise<LicenseEntry[]> {
  const data = await fetchFromGitHub(GITHUB_LICENSE_API);
  return data.map((entry: any) => ({
    name: entry.spdx_id,
    value: entry.spdx_id,
    description: entry.name,
  }));
}

export async function generateLicense({
  license,
  fullname,
  year,
}: LicenseDetails): Promise<string> {
  const data = await fetchFromGitHub(`${GITHUB_LICENSE_API}/${license}`);
  return replacePlaceholders(data.body, { fullname, year });
}