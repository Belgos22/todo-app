/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
  @MaxLength(200, { message: 'Le titre ne peut pas dépasser 200 caractères' })
  title: string;
}
