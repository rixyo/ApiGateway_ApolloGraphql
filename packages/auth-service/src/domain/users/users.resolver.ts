import { UserInputError } from '@nestjs/apollo';
import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from './enity/user.entity';
import { CreateUserInput } from '../../graphql.classes';
import { UserSignup } from './dto/users.dto';
import { validate } from 'class-validator';

@Resolver('User')
export class UsersResolver {
  //constructor() {}
  @Mutation('createUser')
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    let createdUser: UserEntity | null;
    try {
      const { email, username, password } = createUserInput;
      const userSignup = new UserSignup();
      userSignup.email = email;
      userSignup.username = username;
      userSignup.password = password;
      const errors = await validate(userSignup);

      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      //return await this.usersService.create(createUserInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return createdUser;
  }
}
