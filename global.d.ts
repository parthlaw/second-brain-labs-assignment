import { Request, Response, NextFunction } from 'express';

interface JSONResponse<RespType> {
  success?: boolean;
  error?: boolean;
  message: string;
  data?: RespType;
}

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
  json(data: T): TypedResponse<T>;
} & { status(code: number): TypedResponse<T> };

type AppResponse<RespType> = TypedResponse<JSONResponse<RespType>>;

declare global {
  type Controller<RespType> = (
    req: Request,
    res: AppResponse<RespType>,
    next: NextFunction
  ) => Promise<AppResponse<RespType>>;
}
