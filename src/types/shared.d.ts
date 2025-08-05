import { Request } from "express";

interface AuthenticatedRequestJWT extends Request {
  user: {
    userId: string;
    username: string
  };
}
