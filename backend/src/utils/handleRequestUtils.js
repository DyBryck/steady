import { BadRequestError, NotFoundError, ValidationError } from "../errors/customErrors.js";

const defaultStatusCodes = {
  GET: 200,
  POST: 201,
  DELETE: 204,
};

export const handleRequest = (callback) => async (req, res) => {
  try {
    const data = await callback(req);

    const code = defaultStatusCodes[req.method];
    res.status(code).send(data);
  } catch (error) {
    let statusCode = 500;

    if (error instanceof BadRequestError || error instanceof ValidationError) statusCode = 400;
    if (error instanceof NotFoundError) statusCode = 404;

    res.status(statusCode).json({ error: error.message });
  }
};
