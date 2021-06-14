import { HttpStatus } from './HttpStatus';

export class HttpException {
    public message: string|object;
    public statusCode: number;

    constructor(message: string|object, statusCode = HttpStatus.SERVER_ERROR) {
      this.message = message;
      this.statusCode = statusCode;
    }
}
