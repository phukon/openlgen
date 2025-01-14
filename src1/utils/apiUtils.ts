import { GithubLicenseResponse, LicenseEntry } from '../types';

const GITHUB_API_BASE = 'https://api.github.com/licenses';

export class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchFromGitHub(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new ApiError(
        `GitHub API request failed: ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : String(error)}`,
      0
    );
  }
}

export async function fetchAllLicenses(): Promise<LicenseEntry[]> {
  const data = await fetchFromGitHub(GITHUB_API_BASE);
  return data.map((entry: GithubLicenseResponse) => ({
    name: entry.spdx_id,
    value: entry.spdx_id,
    description: entry.name,
  }));
}

export async function fetchLicenseById(licenseId: string): Promise<GithubLicenseResponse> {
  return fetchFromGitHub(`${GITHUB_API_BASE}/${licenseId}`);
}