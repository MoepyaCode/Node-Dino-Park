import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Zone {

    @PrimaryColumn()
    location: string

    @Column()
    park_id: number

    @Column()
    is_safe: boolean

    @Column({ nullable: true })
    last_maintenance_time: string | null // lastest time

}