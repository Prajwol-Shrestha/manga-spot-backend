import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any) {
    console.log(err, user, info, context)
    if (err || info) {
      // Log error if needed
      return null; // treat as unauthenticated
    }
    console.log(user, 'user')
    return user; // valid user
  }
}
