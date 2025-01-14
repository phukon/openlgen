import { ConfigLoader } from '../../core/config/loader.js';
import { LicenseFetcher } from '../../core/license/fetcher.js';
import { LicenseGenerator } from '../../core/license/generator.js';

export async function executeAutoCommand() {
  const config = await new ConfigLoader().load();
  const fetcher = new LicenseFetcher();
  const generator = new LicenseGenerator();

  const licenseContent = await fetcher.fetchLicenseContent(config.license);
  await generator.generate(licenseContent.body, {
    fullname: config.author,
    license: config.license
  });
}