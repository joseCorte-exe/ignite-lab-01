import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';

type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
};

export type Customer = {
  authUserId: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
};

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentById(
      payload.customer.authUserId,
    );

    if (!student)
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course)
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
