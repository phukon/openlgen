export interface LicenseConfig {
  license: string;
  author: string;
  year?: number;
}

export interface LicenseTemplate {
  body: string;
  spdx_id: string;
  name: string;
}

export interface LicenseVariables {
  fullname: string;
  year?: number;
  license: string;
}