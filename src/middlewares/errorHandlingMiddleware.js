import ApiError from '../errors/ApiError.js';

const ApiErrorHandler = (req, res, err) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Unexpected error' });
};

export default ApiErrorHandler;
