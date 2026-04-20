import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createUser(userDto: UserDto): Promise<User> {
    this.logger.log(`Creating user with email: ${userDto.email}`);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...userDto,
          role: userDto.role || Role.MEMBER,
        },
      });

      this.logger.log(`User created successfully with ID: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }


  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id.trim() },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof HttpException) {
        throw error;
      }

      const message = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to get user: ${message}`, stack);
      throw error;
    }
  }
}