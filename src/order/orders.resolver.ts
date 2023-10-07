import { Mutation, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { Role } from 'src/auth/role.decorator';
import { OrderService } from './orders.service';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order-dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Order)
@Role(['Client'])
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(
    @AuthUser() customer: User,
    createOrderInput: CreateOrderInput,
  ) {
    return {
      ok: true,
    };
  }
}
