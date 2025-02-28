import _ = require("lodash");
import { AppDataSource } from "../data-source";
import { Dino, Zone } from "../entities";
import { DinoDigestI, ZoneServiceI } from "../models";
import { DinoService } from "./dino.service";

export class ZoneService implements ZoneServiceI {
    private zoneRepository = AppDataSource.getRepository(Zone)

    init = async (): Promise<void> => {
        const response = await this.getAllZones()

        if (!_.isEmpty(response)) return

        const columns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const maxRows = 16

        try {
            for (let row = 1; row <= maxRows; row++) {
                for (const column of columns) {
                    const zone: Zone = {
                        location: `${column}${row}`.toUpperCase(),
                        is_safe: true,
                        last_maintenance_time: null,
                        park_id: 1
                    }
                    await this.zoneRepository.save(zone)
                }
            }

            console.log("Successfully initialized the Zones!")
        } catch (error) {
            throw new Error('Unexpected error while saving zones to database!')
        }
    }

    getAllZones = async (): Promise<Zone[]> => {
        return this.zoneRepository.find()
    }

    getZoneByLocation = async (location: string): Promise<Zone> => {
        const data = await this.zoneRepository.findOneBy({ location })
        console.log(`Zone data retrieved: ${location}`); // Log query result
        if (!data) throw new Error('Zone does not exist!')
        return data
    }

    updateZone = async (location: string, dinos: DinoDigestI[]): Promise<Zone> => {
        const zone = await this.getZoneByLocation(location)

        for (let dino of dinos) {
            if (!dino.herbivore && _.isNull(dino.remaining_digest_time)) {
                return this.zoneRepository.save({
                    ...zone,
                    is_safe: false
                })
            }
        }

        return this.zoneRepository.save({
            ...zone,
            is_safe: true
        })
    }

    maintenanceUpdate = async (location: string): Promise<Zone> => {
        let zone = await this.getZoneByLocation(location)
        const currentDateTime = new Date().toISOString()

        zone.last_maintenance_time = currentDateTime

        return this.zoneRepository.save(zone)
    }
}