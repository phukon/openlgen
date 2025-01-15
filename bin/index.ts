#!/usr/bin/env node
import { Command } from 'commander';
import { generateLicense, fetchLicenses } from '../src/core/LicenseService';
import { ConfigService } from '../src/core/ConfigService';
import { updatePackageJson, writeLicenseFile } from '../src/utils/fileUtils';
import { PromptService } from '../src/ui/prompts';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { join } from 'path';

const program = new Command();

const schema = {
  type: 'string',
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
);
const { version } = packageJson;

program
  .name('openlgen')
  .description('Generate licenses for your project blazing fast')
  .version(version)
  .addHelpText(
    'after',
    `
Examples:
  $ openlgen              # Interactive license generation
  $ openlgen --version    # Show version
  $ openlgen --help       # Show help
`
  )
  .action(async () => {
    try {
      const mode = await PromptService.getGenerationMode();

      if (mode === 'custom') {
        const licenses = await fetchLicenses();
        const selectedLicense = await PromptService.getLicenseChoice(licenses);
        const authorDetails = await PromptService.getAuthorDetails();

        const confirmed = await PromptService.confirmGeneration({
          license: selectedLicense,
          fullname: authorDetails.fullname,
          year: authorDetails.year,
        });

        if (!confirmed) {
          console.log('Operation cancelled');
          process.exit(0);
        }

        const licenseContent = await generateLicense({
          license: selectedLicense,
          fullname: authorDetails.fullname,
          year: authorDetails.year,
        });

        await writeLicenseFile(licenseContent);
        await updatePackageJson({
          license: selectedLicense,
          author: authorDetails.fullname,
        });
      } else {
        const config = await new ConfigService(schema).load();
        const licenseContent = await generateLicense({
          license: config.license,
          fullname: config.fullname,
        });

        await writeLicenseFile(licenseContent);
        await updatePackageJson({
          license: config.license,
          author: config.fullname,
        });
      }

      console.log('License generated successfully!');
    } catch (error) {
      console.error(
        'Error:',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  });

program.parse();
