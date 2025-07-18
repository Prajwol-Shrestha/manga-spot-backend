import { Request } from "express";
import { UserOutputDto } from "src/user/dtos/user-output.dto";

interface AuthenticatedRequest extends Request {
  user: UserOutputDto;
}
