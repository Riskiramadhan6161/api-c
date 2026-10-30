import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksAuthorDto } from './create-books_author.dto.js';

export class UpdateBooksAuthorDto extends PartialType(CreateBooksAuthorDto) {}