import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { StudentsService } from 'src/services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studentsSerevice: StudentsService) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsSerevice.listAllStudents();
  }
}
