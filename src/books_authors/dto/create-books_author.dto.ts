import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBooksAuthorDto {
  @IsNotEmpty()
  @IsUUID()
  book_id: string; // Ubah menjadi book_id

  @IsNotEmpty()
  @IsUUID()
  author_id: string; // Ubah menjadi author_id
}