import { IsInt, IsPositive, IsString, Length, Max, Min } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @Length(5, 100)
  nombre: string;
  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(120)
  edad: number;
}
