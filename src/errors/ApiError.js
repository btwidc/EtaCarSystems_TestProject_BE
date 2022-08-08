class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound() {
    return new ApiError(404, 'Element not found');
  }

  static AlreadyExists() {
    return new ApiError(409, 'Element already exists');
  }
}

export default ApiError;
