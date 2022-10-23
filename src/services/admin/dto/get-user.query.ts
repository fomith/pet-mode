import { IsOptional, IsString, IsNotEmpty } from 'class-validator'

export class getUserQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone: string
}
