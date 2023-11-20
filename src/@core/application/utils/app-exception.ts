export class Exception extends Error {
  message: string;
  statusCode: number;

  constructor(message?: string, status?: number) {
    super();
    this.message = message || 'Internal Server Error';
    this.statusCode = status || 500;
  }
}
