import fs from 'fs/promises';
import { PackageJsonUpdate } from '../types.js';

export class FileUtils {
  static async updatePackageJson({
    license,
    author,
  }: PackageJsonUpdate): Promise<boolean> {
    const packageJsonPath = 'package.json';

    try {
      const content = await fs.readFile(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(content);

      packageJson.license = license;
      if (author) packageJson.author = author;

      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
      return true;
    } catch (error) {
      throw new Error(
        `Failed to update package.json: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  static async writeLicenseFile(content: string): Promise<boolean> {
    try {
      await fs.writeFile('LICENSE', content);
      return true;
    } catch (error) {
      throw new Error(
        `Failed to write LICENSE file: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}
