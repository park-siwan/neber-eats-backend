import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './entities/user.entity';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }
}
