import { IsString } from "class-validator";

export class GenerateDatabaseDto {
    @IsString()
    databaseName: string;
}