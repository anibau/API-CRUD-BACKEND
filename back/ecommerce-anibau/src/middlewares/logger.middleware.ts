import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `este es un middleware con la ruta ${req.url} y su metodo es ${req.method} y la fecha ${new Date()}`,
  );
  next();
}
