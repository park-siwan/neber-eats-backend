import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';

/** resolver가 하는 일은 오직 input 가지고 output을 보내는 것
 * ex) if else 사용은 여기서 안함
 *  -> 로직은 service.ts 에서 하기
 */

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      return this.userService.createAccount(createAccountInput);
    } catch (error) {
      return error;
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Query((returns) => User)
  me(@Context() context) {
    if (!context) {
      return;
    } else {
      return context.user;
    }
  }
}
