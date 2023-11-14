import { Inject, Injectable } from '@nestjs/common/decorators';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '../users/enity/user.entity';
import { forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<UserEntity | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByUsername(payload.username);

    // Ensure the user exists and their account isn't disabled
    if (user) {
      user.updated_at = new Date();
      user.save();
      return user;
    }

    return undefined;
  }
}
