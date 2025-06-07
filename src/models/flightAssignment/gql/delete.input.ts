import { InputType } from '@nestjs/graphql';
import { CreateFlightAssignmentInput } from './create.input';

@InputType()
export class DeleteFlightAssignmentInput extends CreateFlightAssignmentInput {}
