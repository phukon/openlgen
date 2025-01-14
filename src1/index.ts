#!/usr/bin/env node
import { Command } from 'commander';
import { LicenseService } from './core/LicenseService';
import { ConfigService } from './core/ConfigService';
import { FileUtils } from './utils/fileUtils';
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
      
      console.log('License generated successfully!');
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();