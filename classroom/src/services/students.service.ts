import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateStudentParams = {
  authUserId: string;
};

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  createStudent({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        id: authUserId,
      },
    });
  }

  getStudentsByAuthId(authUserId) {
    return this.prisma.student.findUnique({
      where: {
        id: authUserId,
      },
    });
  }
}
