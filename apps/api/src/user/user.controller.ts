import { Controller, Post, Body, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto, UserResponseDto } from './user.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create user (email and clerkId must be unique)' })
  @ApiCreatedResponse({
    description: 'Created user record',
    type: UserResponseDto,
  })
  async createUser(@Body() createUserDto: UserDto): Promise<User> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const field = (error.meta?.target as string[] | undefined)?.[0] ?? 'field';
        throw new ConflictException(`User with this ${field} already exists`);
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }


}
