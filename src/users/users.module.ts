import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, ConfigService],
})
export class UsersModule {}
