import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Dino {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    species: string

    @Column()
    gender: 'male' | 'female'

    @Column()
    digestion_period_in_hours: number

    @Column()
    herbivore: boolean

    @Column()
    park_id: number

    @Column({ nullable: true })
    last_meal_time: string | null // lastest time

    @Column({ nullable: true })
    location: string | null;
}