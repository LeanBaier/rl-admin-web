export class RlResponse<D> {
  data: D;
  messages: RlMessage[];
  error: RlError;

  constructor(data: D, messages: RlMessage[], errors: RlError) {
    this.data = data;
    this.messages = messages;
    this.error = errors;
  }
}

export class RlMessage {
  code: String;
  message: String;

  constructor(code: String, message: String) {
    this.code = code;
    this.message = message;
  }
}

export class RlError {
  errorCode: String;
  errorMessage: String;
  status: Number;
  timestamp: Date;

  constructor(code: String, message: String, status: Number, timestamp: Date) {
    this.errorCode = code;
    this.errorMessage = message;
    this.status = status;
    this.timestamp = timestamp;
  }
}
