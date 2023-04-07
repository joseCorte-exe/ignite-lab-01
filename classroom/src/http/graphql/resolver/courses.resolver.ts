import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CoursesService } from 'src/services/courses.service';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private coursesSerevice: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesSerevice.listAllCourses();
  }
}
