import { IsInt, IsPositive, IsString, Length, Max, Min } from 'class-validator';

export class UpdatePersonaDto {
  @IsInt()
  @IsPositive()
  @Min(0)
  id: number;
  @IsString()
  @Length(5, 50)
  nombre: string;
  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(120)
  edad: number;
}
