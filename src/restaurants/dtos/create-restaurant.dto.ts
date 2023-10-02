import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends OmitType(Restaurant, [
  'id',
  'category',
  'owner',
]) {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
