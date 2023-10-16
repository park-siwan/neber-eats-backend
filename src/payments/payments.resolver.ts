import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Resolver } from '@nestjs/graphql';
import { PaymentService } from './payments.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    @InjectRepository(Payment) private readonly paymentService: PaymentService,
  ) {}
}
