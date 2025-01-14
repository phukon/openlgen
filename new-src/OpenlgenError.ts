export class OpenlgenError extends Error {
  constructor(
    message: string,
    public code: OpenlgenErrorCode,
    public details?: any
  ) {
    super(message);
    this.name = 'OpenlgenError';
    Object.setPrototypeOf(this, OpenlgenError.prototype);
  }
}

export const OpenlgenErrorCodes = {
  // Config Errors
  CONFIG_NOT_FOUND: 'CONFIG_NOT_FOUND',
  INVALID_CONFIG: 'INVALID_CONFIG',
  
  // License Errors
  LICENSE_FETCH_FAILED: 'LICENSE_FETCH_FAILED',
  LICENSE_GENERATION_FAILED: 'LICENSE_GENERATION_FAILED',
  
  // File Operation Errors
  FILE_WRITE_ERROR: 'FILE_WRITE_ERROR',
  FILE_READ_ERROR: 'FILE_READ_ERROR',
  
  // Network Errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  
  // Validation Errors
  INVALID_LICENSE_TYPE: 'INVALID_LICENSE_TYPE',
  INVALID_AUTHOR_NAME: 'INVALID_AUTHOR_NAME',
  INVALID_YEAR: 'INVALID_YEAR'
} as const;

export type OpenlgenErrorCode = typeof OpenlgenErrorCodes[keyof typeof OpenlgenErrorCodes];

export function getErrorMessage(code: OpenlgenErrorCode): string {
  const messages: Record<OpenlgenErrorCode, string> = {
    CONFIG_NOT_FOUND: 'Configuration file not found',
    INVALID_CONFIG: 'Invalid configuration format',
    LICENSE_FETCH_FAILED: 'Failed to fetch license from GitHub API',
    LICENSE_GENERATION_FAILED: 'Failed to generate license file',
    FILE_WRITE_ERROR: 'Failed to write file',
    FILE_READ_ERROR: 'Failed to read file',
    NETWORK_ERROR: 'Network connection error',
    API_ERROR: 'GitHub API error',
    INVALID_LICENSE_TYPE: 'Invalid license type specified',
    INVALID_AUTHOR_NAME: 'Invalid author name',
    INVALID_YEAR: 'Invalid year format'
  };
  return messages[code] || 'Unknown error';
}