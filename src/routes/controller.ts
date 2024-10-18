import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Task from '../models/task.model';

interface ResponseParams {
  res: Response;
  message: string;
  code?: number;
  data?: Record<string, unknown>;
}

export default class TaskController {
  Task: typeof Task;

  constructor() {
    this.Task = Task;

    this.validationBody = this.validationBody.bind(this);
    this.validate = this.validate.bind(this);
    this.response = this.response.bind(this);
  }

  validationBody(req: Request, res: Response): boolean {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errors = result.array();
      const messages: string[] = errors.map((err) => err.msg);

      res.status(400).json({
        message: 'validation is invalid',
        data: messages,
      });
      return false;
    }
    return true;
  }

  validate(req: Request, res: Response, next: NextFunction): void {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }

  response({ res, message, code = 200, data = {} }: ResponseParams): void {
    res.status(code).json({
      message,
      data,
    });
  }
}
