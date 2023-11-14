import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './enity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}
  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    const user = await this.userRepo.findOne({
      where: { lowercaseUsername: username.toLowerCase() },
    });
    if (user) {
      return user;
    }
  }

  /**
   * Gets all the users that are registered
   *
   * @returns {Promise<UserEntity[]>}
   * @memberof UsersService
   */
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepo.find({});
    return users;
  }
}
