import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollemnts() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollemnt: Enrollment) {
    return this.studentsService.getStudentById(enrollemnt.studentId);
  }

  @ResolveField()
  course(@Parent() enrollemnt: Enrollment) {
    return this.coursesService.getCourseById(enrollemnt.studentId);
  }
}
