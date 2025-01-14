export interface LicenseEntry {
  name: string;
  value: string;
  description: string;
}

export interface LicenseDetails {
  license: string;
  fullname: string;
  year?: number;
}

export interface PackageJsonUpdate {
  license: string;
  author: string;
}

export interface AuthorDetails {
  fullname: string;
  year: number;
}

export interface GithubLicenseResponse {
  spdx_id: string;
  name: string;
  body: string;
}
