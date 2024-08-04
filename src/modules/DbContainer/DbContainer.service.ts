import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ContainerEntity } from "./container.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { execSync } from 'child_process';
import { GenerateDatabaseDto } from "./dtos/generate-database.dto";

@Injectable()
export class DbContainersService {

    constructor(
        @InjectRepository(ContainerEntity)
        private readonly containerRepo: Repository<ContainerEntity>
    ) { }


    async generateDbContainer(generateDatabaseDto: GenerateDatabaseDto) {

        const { databaseName } = generateDatabaseDto;

        const lastGeneratedContainer = await this.containerRepo
            .createQueryBuilder('container')
            .select('container.portNumber')
            .orderBy('portNumber', 'DESC')
            .getOne();

        const newContainerPort = lastGeneratedContainer ? lastGeneratedContainer.portNumber + 1 : 3307;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomPassword = '';
        for (let i = 0; i < 12; i++) {
            randomPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        try {
            execSync(`docker run -itd -e MYSQL_ROOT_PASSWORD=${randomPassword} -e MYSQL_DATABASE=${databaseName} -p ${newContainerPort}:3306 mysql:8`);
        }
        catch (err) {
            throw new ServiceUnavailableException();
        }
        finally {
            const container = new ContainerEntity();
            container.portNumber = newContainerPort;
            await this.containerRepo.save(container);
        }


        return {
            message: 'container created',
            address: `process.env.HOST_ADDRESS:${newContainerPort}`,
            databaseName: databaseName,
            username: 'root',
            password: randomPassword
        };
    }
}