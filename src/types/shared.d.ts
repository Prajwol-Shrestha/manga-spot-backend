import { Request } from "express";
import { UserOutputDto } from "src/user/dtos/user-output.dto";

interface AuthenticatedRequestJWT extends Request {
  user: {
    userId: string;
    username: string
  };
}
