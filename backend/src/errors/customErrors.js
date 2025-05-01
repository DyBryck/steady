export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
  }
}
