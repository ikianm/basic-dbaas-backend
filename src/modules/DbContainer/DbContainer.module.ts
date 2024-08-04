import { Module } from "@nestjs/common";
import { DbContainersContoller } from "./DbContainer.controller";
import { DbContainersService } from "./DbContainer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContainerEntity } from "./container.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ContainerEntity])
    ],
    controllers: [DbContainersContoller],
    providers: [DbContainersService]
})
export class DbContainersModule{}