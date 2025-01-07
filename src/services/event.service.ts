import { Dino, Zone } from "../entities";
import { EventReturnI, EventListType, EventServiceI, EventType, DinoDigestI } from "../models";
import { apiFetcher } from "../utils";
import { DinoService } from "./dino.service";
import { ZoneService } from "./zone.service";


export class EventService implements EventServiceI {
    private dinoService: DinoService
    private zoneService: ZoneService

    constructor() {
        this.dinoService = new DinoService()
        this.zoneService = new ZoneService()
    }

    addDinoHandler = async (event: EventType): Promise<EventReturnI> => {
        try {
            const { kind, time, dinosaur_id, last_meal_time, ...rest } = event

            await this.zoneService.getZoneByLocation(rest.location)
            const dino = await this.dinoService.addDino({ ...rest } as Dino)
            const newZone = await this.updateZoneSimplified(dino)

            return { dino, newZone }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    feedDinoHandler = async (event: EventType): Promise<EventReturnI> => {
        try {
            const { dinosaur_id } = event

            await this.dinoService.getDinoById(dinosaur_id)
            const dino = await this.dinoService.feedDino(dinosaur_id)
            const newZone = await this.updateZoneSimplified(dino)

            return { dino, newZone }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateDinoLocationHandler = async (event: EventType): Promise<EventReturnI> => {
        try {
            const { dinosaur_id, location } = event

            await this.zoneService.getZoneByLocation(location)
            const dino = await this.dinoService.getDinoById(dinosaur_id)
            const updatedDino = await this.dinoService.updateDinoLocation({ id: dinosaur_id, location })

            // New Location Safe Review
            const newZone = await this.updateZoneSimplified(updatedDino)

            // Old Location Safe Review
            const oldZone = await this.updateZoneSimplified(dino)

            return { dino, newZone, oldZone }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    removeDinoHandler = async (event: EventType): Promise<EventReturnI> => {
        try {
            const { dinosaur_id } = event

            await this.dinoService.getDinoById(dinosaur_id)
            const dino = await this.dinoService.removeDinoById(event.id)
            const newZone = await this.updateZoneSimplified(dino)

            return { dino, newZone }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    maintenanceUpdateHandler = async (event: EventType): Promise<Zone> => {
        try {
            const { location } = event
            return this.zoneService.maintenanceUpdate(location)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    syncFeed = async (): Promise<boolean> => {
        try {
            const eventFeed = await apiFetcher()
            const sortedFeed = this.sortedEvents(eventFeed as EventListType)

            for (const event of sortedFeed) {
                await this.eventHandler(event)
            }

            return true
        } catch (error) {
            throw new Error(error)
        }
    }

    sortedEvents = (eventFeed: EventListType) => {
        return eventFeed.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    }

    /**
     * Handles all events that affect Dino and Zone
     * @param event 
     */
    private eventHandler = async (event: EventType): Promise<void> => {
        console.log(`\nHandling event: ${event.kind}, ${event.id ? 'Location: ' : 'ID:'} ${(event.id || event.dinosaur_id) ? event.id ?? event.dinosaur_id : event.location}`);

        try {
            
            switch (event.kind) {
                case 'dino_added':
                    await this.addDinoHandler(event);
                    break;
                case 'dino_location_updated':
                    await this.updateDinoLocationHandler(event);
                    break;
                case 'dino_fed':
                    await this.feedDinoHandler(event);
                    break;
                case 'dino_removed':
                    await this.removeDinoHandler(event);
                    break;
                case 'maintenance_performed':
                    await this.maintenanceUpdateHandler(event);
                    break;
                default:
                    throw new Error('Unknown event kind!');
            }

            console.log(`Event handled: ${event.kind}, ${event.id ? 'Location: ' : 'ID:'} ${(event.id || event.dinosaur_id) ? event.id ?? event.dinosaur_id : event.location}\n`);
        } catch (error) {
            console.error(`Error: ${error.message}, Event: ${event.kind}, ${event.id ? 'Location: ' : 'ID:'} ${(event.id || event.dinosaur_id) ? event.id ?? event.dinosaur_id : event.location}\n`);
            throw error;
        }
    }

    private updateZoneSimplified = async (dino: Dino): Promise<Zone> => {
        const dinos = await this.dinoService.getAllDinosInZone(dino.location)
        return this.zoneService.updateZone(dino.location, dinos)
    }
}