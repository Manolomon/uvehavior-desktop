import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({name: 'test'})
export class Test extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    TestName: string;

    @Column()
    TestDescription: string;

    @Column()
    TestTime: number;
}