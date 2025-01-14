import { OpenlgenError, OpenlgenErrorCodes } from '../../errors/OpenlgenError';
import { LicenseTemplate, LicenseVariables } from '../../types';
import { FileOperations } from '../../utils/file-operations';
import { Logger } from '../../utils/logger';

export class LicenseGenerator {
  private logger: Logger;
  private fileOps: FileOperations;

  constructor(logger: Logger, fileOps: FileOperations) {
    this.logger = logger;
    this.fileOps = fileOps;
  }

  async generate(template: LicenseTemplate, variables: LicenseVariables): Promise<void> {
    try {
      const content = this.replacePlaceholders(template.body, variables);
      await this.fileOps.writeLicenseFile(content);
      await this.fileOps.updatePackageJson(variables.license, variables.fullname);
      
      this.logger.info('License generated successfully');
    } catch (error) {
      throw new OpenlgenError(
        'Failed to generate license',
        OpenlgenErrorCodes.LICENSE_GENERATION_FAILED,
        error
      );
    }
  }

  private replacePlaceholders(template: string, variables: LicenseVariables): string {
    const year = variables.year || new Date().getUTCFullYear();
    
    return template
      .replace(/\[fullname\]/g, variables.fullname)
      .replace(/\[year\]/g, year.toString());
  }
}