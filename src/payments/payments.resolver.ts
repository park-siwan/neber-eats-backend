import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payments.service';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/create-payment.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorator';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    @InjectRepository(Payment) private readonly paymentService: PaymentService,
  ) {}

  @Mutation(() => CreatePaymentOutput)
  @Role(['Owner'])
  createPayment(
    @AuthUser() owner: User,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(owner, createPaymentInput);
  }
}
