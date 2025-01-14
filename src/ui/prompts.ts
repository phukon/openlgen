import select from '@inquirer/select';
import input from '@inquirer/input';
import confirm from '@inquirer/confirm';
import { LicenseEntry, AuthorDetails } from '../types';

export class PromptService {
  static async getLicenseChoice(licenses: LicenseEntry[]): Promise<string> {
    return select({
      message: 'Select license',
      choices: licenses,
    });
  }

  static async getGenerationMode(): Promise<'auto' | 'custom'> {
    const answer = await select({
      message: 'Select generation mode',
      choices: [
        {
          name: 'Auto',
          value: 'auto',
          description: 'Automatically generate using package.json values',
        },
        {
          name: 'Custom',
          value: 'custom',
          description: 'Manually configure your license',
        },
      ],
    });
    return answer as 'auto' | 'custom';
  }

  static async getAuthorDetails(): Promise<AuthorDetails> {
    const fullname = await input({
      message: 'Enter your name:',
      validate: (input: string) => input.trim().length > 0,
    });

    const year = await input({
      message: 'Enter the year (leave blank for current):',
      validate: (input: string) => !input || /^\d{4}$/.test(input),
    });

    return {
      fullname,
      year: year ? parseInt(year, 10) : new Date().getUTCFullYear(),
    };
  }

  static async confirmGeneration(
    details: Record<string, unknown>,
  ): Promise<boolean> {
    console.log('\nLicense Details:');
    Object.entries(details).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    return confirm({ message: 'Continue?' });
  }
}
