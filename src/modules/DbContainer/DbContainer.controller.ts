import { Body, Controller, Post } from "@nestjs/common";
import { DbContainersService } from "./DbContainer.service";
import { GenerateDatabaseDto } from "./dtos/generate-database.dto";

@Controller('db-container')
export class DbContainersContoller {

    constructor(
        private readonly dbContainersService: DbContainersService
    ) { }

    @Post('generate')
    generateDbContainer(@Body() generateDatabaseDto: GenerateDatabaseDto) {
        return this.dbContainersService.generateDbContainer(generateDatabaseDto);
    }
}