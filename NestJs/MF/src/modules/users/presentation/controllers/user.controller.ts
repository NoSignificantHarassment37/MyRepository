import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserApplicationService } from '../../application/services/user-application.service';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from '../dto';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Controlador (Adapter de entrada)
 * Adapta las peticiones HTTP a la capa de aplicación
 */
@Controller('users')
export class UserController {
  constructor(
    private readonly userApplicationService: UserApplicationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userApplicationService.createUser({
      name: dto.name,
      email: dto.email,
    });
    return this.toResponseDto(user);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userApplicationService.getAllUsers();
    return users.map((user) => this.toResponseDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userApplicationService.getUserById(Number(id));
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return this.toResponseDto(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userApplicationService.updateUser(
      Number(id),
      dto,
    );
    return this.toResponseDto(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.userApplicationService.deleteUser(Number(id));
  }

  private toResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

