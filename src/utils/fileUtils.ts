import fs from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { PackageJsonUpdate } from '../types.js';

async function writeFileAtomically(
  filepath: string,
  content: string,
): Promise<void> {
  const tempPath = join(process.cwd(), `.${randomUUID()}.tmp`);
  try {
    await fs.writeFile(tempPath, content, 'utf8');
    await fs.rename(tempPath, filepath);
  } catch (error) {
    await fs.unlink(tempPath).catch(() => {});
    throw error;
  }
}

export async function updatePackageJson({
  license,
  author,
}: PackageJsonUpdate): Promise<boolean> {
  const packageJsonPath = 'package.json';

  try {
    const content = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(content);

    packageJson.license = license;
    if (author) packageJson.author = author;

    await writeFileAtomically(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
    );
    return true;
  } catch (error) {
    throw new Error(
      `Failed to update package.json: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

export async function writeLicenseFile(content: string): Promise<boolean> {
  try {
    await writeFileAtomically('LICENSE', content);
    return true;
  } catch (error) {
    throw new Error(
      `Failed to write LICENSE file: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}
