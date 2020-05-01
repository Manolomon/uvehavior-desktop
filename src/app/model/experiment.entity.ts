import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({name: 'experiment'})
export class Experiment extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ExperimentName: string;

    @Column()
    Description: string;
}