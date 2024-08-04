import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContainerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    portNumber: number;
}