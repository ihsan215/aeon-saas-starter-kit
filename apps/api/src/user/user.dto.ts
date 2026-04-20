import { IsEmail, IsString, IsEnum, IsOptional, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Clerk user ID for authentication',
    example: 'user_2oX8vN5kP9qR7tY2mL3',
  })
  @IsString()
  @IsNotEmpty()
  clerkId: string;

  @ApiPropertyOptional({
    description: 'User display name',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'User role in the system',
    enum: Role,
    default: Role.MEMBER,
    example: Role.MEMBER,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

/** Swagger-only shape for POST /user/create response (matches Prisma `User`). */
export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'user_2oX8vN5kP9qR7tY2mL3' })
  clerkId: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  name: string | null;

  @ApiProperty({ enum: Role, example: Role.MEMBER })
  role: Role;
}