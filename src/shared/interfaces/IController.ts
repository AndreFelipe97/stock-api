import { Request, Response } from 'express';

export default interface IController {
  list(request: Request, response: Response): Promise<Response>;
  detail(request: Request, response: Response): Promise<Response>;
  create(request: Request, response: Response): Promise<Response>;
  update(request: Request, response: Response): Promise<Response>;
  delete(request: Request, response: Response): Promise<Response>;
}
