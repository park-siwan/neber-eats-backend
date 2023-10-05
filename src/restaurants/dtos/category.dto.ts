import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';
import {
  PagiantionOutput,
  PaginationInput,
} from 'src/common/dtos/pagination.dto';

@InputType()
export class CategoryInput extends PaginationInput {
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class CategoryOutput extends PagiantionOutput {
  @Field(() => Category, { nullable: true })
  category?: Category;
}
