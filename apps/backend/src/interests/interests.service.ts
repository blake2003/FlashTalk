import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InterestsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllActive() {
    return this.prisma.interest.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, code: true, name: true },
    });
  }
}
