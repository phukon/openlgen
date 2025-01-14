import { cosmiconfigSync } from 'cosmiconfig';
import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';

export class ConfigService {
  private ajv: Ajv;
  private schema: Record<string, any>;
  private licenseLoader: ReturnType<typeof cosmiconfigSync>;
  private authorLoader: ReturnType<typeof cosmiconfigSync>;

  constructor(schema: Record<string, any>) {
    this.ajv = new Ajv();
    this.schema = schema;
    this.licenseLoader = cosmiconfigSync('license');
    this.authorLoader = cosmiconfigSync('author');
  }

  async load(): Promise<{ license: string; fullname: string }> {
    const license = this.licenseLoader.search(process.cwd());
    const author = this.authorLoader.search(process.cwd());

    if (!license || !author) {
      throw new Error('Missing required configuration');
    }

    this.validateConfig(license.config, 'license');
    this.validateConfig(author.config, 'author');

    return {
      license: license.config,
      fullname: author.config
    };
  }

  private validateConfig(config: unknown, type: string): void {
    const isValid = this.ajv.validate(this.schema, config);
    if (!isValid) {
      throw new Error(
        `Invalid ${type} configuration:\n${betterAjvErrors(this.schema, config, this.ajv.errors)}`
      );
    }
  }
}