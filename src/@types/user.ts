import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: any;
        name: string;
        email: string;
        verified: boolean;
        avatar?: string;
        followers: number;
        followings: number;
      };
      token: string;
    }
  }
}

export interface ICreateUser extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface IVerifyEmailRequest extends Request {
  body: {
    userId: string;
    token: string;
  };
}
