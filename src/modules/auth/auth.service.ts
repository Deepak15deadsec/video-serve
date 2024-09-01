import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private validTokens = ['your_static_api_token_here'];

  validateToken(token: string): boolean {
    return this.validTokens.includes(token);
  }
}