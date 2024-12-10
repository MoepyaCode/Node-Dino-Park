import _ = require("lodash");
import { AppDataSource } from "../data-source";
import { Dino, Zone } from "../entities";
import { DinoDigestI, ZoneServiceI } from "../models";
import { DinoService } from "./dino.service";

export class ZoneService implements ZoneServiceI {
    private zoneRepository = AppDataSource.getRepository(Zone)
    private zoneLocks = new Map<string, Promise<Zone>>()

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
        if (this.zoneLocks.has(location)) {
            return this.zoneLocks.get(location)!;
        }

        const zonePromise = this.fetchZoneData(location);
        this.zoneLocks.set(location, zonePromise);

        try {
            return await zonePromise;
        } finally {
            this.zoneLocks.delete(location);
        }
    }

    private fetchZoneData = async (location: string): Promise<Zone> => {
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

        return await this.zoneRepository.save(zone)
    }
}