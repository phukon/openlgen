#!/usr/bin/env node
import { Command } from 'commander';
import { LicenseService } from '../src/core/LicenseService';
import { ConfigService } from '../src/core/ConfigService';
import { FileUtils } from '../src/utils/fileUtils';
import { PromptService } from '../src/ui/prompts';
import fs from 'fs';

const program = new Command();

const loadJSON = (path: string): Record<string, any> =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf-8'));

const schema = loadJSON('./schema.json');

program
  .name('openlgen')
  .description('Generate licenses for your project blazing fast')
  .version('0.8.0')
  .action(async () => {
    try {
      const mode = await PromptService.getGenerationMode();

      if (mode === 'custom') {
        const licenses = await LicenseService.fetchLicenses();
        const selectedLicense = await PromptService.getLicenseChoice(licenses);
        const authorDetails = await PromptService.getAuthorDetails();
        
        const confirmed = await PromptService.confirmGeneration({
          license: selectedLicense,
          fullname: authorDetails.fullname,
          year: authorDetails.year
        });

        if (!confirmed) {
          console.log('Operation cancelled');
          process.exit(0);
        }

        const licenseContent = await LicenseService.generateLicense({
          license: selectedLicense,
          fullname: authorDetails.fullname,
          year: authorDetails.year
        });

        await FileUtils.writeLicenseFile(licenseContent);
        await FileUtils.updatePackageJson({
          license: selectedLicense,
          author: authorDetails.fullname
        });
      } else {
        const config = await new ConfigService(schema).load();
        const licenseContent = await LicenseService.generateLicense({
          license: config.license,
          fullname: config.fullname
        });
        
        await FileUtils.writeLicenseFile(licenseContent);
        await FileUtils.updatePackageJson({
          license: config.license,
          author: config.fullname
        });
      }
      
      console.log('License generated successfully!');
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();