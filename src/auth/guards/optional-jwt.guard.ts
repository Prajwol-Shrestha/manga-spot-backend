import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
      // Don't throw error if token is missing/invalid — just skip user
      console.log(user, 'vashdjgsajkdhsa')
    return user ?? null;
  }
}
