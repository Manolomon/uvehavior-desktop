import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, EntityRepository } from "typeorm";

@Entity({name: 'experiment'})
export class Experiment extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ExperimentName: string;

    @Column()
    Description: string;

    @Column({type: "date"})
    DateCreation: Date
    
    @Column({type: "datetime"})
    DateLastModify: Date
}