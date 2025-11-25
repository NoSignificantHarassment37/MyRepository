import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  user_name: string;
  @ApiProperty()
  password: string;
}
