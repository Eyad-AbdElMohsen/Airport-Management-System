import { Request, Response } from 'express';
import { JwtPayload } from './JwtPayload';

export interface GqlContext {
  req: Request;
  res: Response;
  user?: JwtPayload;
}