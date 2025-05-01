import { BadRequestError, ValidationError } from "../errors/customErrors.js";

const defaultStatusCodes = {
  GET: 200,
  POST: 201,
};

export const handleRequest = (callback) => async (req, res) => {
  try {
    const data = await callback(req);

    const code = defaultStatusCodes[req.method];
    res.status(code).send(data);
  } catch (error) {
    let statusCode = 500;

    if (error instanceof BadRequestError || error instanceof ValidationError) statusCode = 400;

    res.status(statusCode).send(error.message);
  }
};
