import { Request, Response, NextFunction } from "express";
import { Dino, Zone } from "../entities";
import { EventReturnI, EventControllerI, EventServiceI, ZoneServiceI } from "../models";
import { EventService, ZoneService } from "../services";

export class EventController implements EventControllerI {
    private eventService: EventServiceI

    constructor() {
        this.eventService = new EventService()
    }

    syncFeed = (request: Request, response: Response, next: NextFunction): Promise<boolean> => {
        return this.eventService.syncFeed()
    }

    addDino = async (request: Request, response: Response, next: NextFunction): Promise<EventReturnI> => {
        const { body } = request
        return this.eventService.addDinoHandler(body)
    }

    feedDino = (request: Request, response: Response, next: NextFunction): Promise<EventReturnI> => {
        const { id } = request.params
        return this.eventService.feedDinoHandler({ dinosaur_id: parseInt(id) })
    }

    updateDinoLocation = (request: Request, response: Response, next: NextFunction): Promise<EventReturnI> => {
        const { id } = request.params
        const { location } = request.body
        return this.eventService.updateDinoLocationHandler({ dinosaur_id: parseInt(id), location })
    }

    removeDinoById = (request: Request, response: Response, next: NextFunction): Promise<EventReturnI> => {
        const { id } = request.params
        return this.eventService.removeDinoHandler({ dinosaur_id: parseInt(id) })
    }

    maintenancePerformed = (request: Request, response: Response, next: NextFunction): Promise<Zone> => {
        const { location } = request.params
        return this.eventService.maintenanceUpdateHandler({ location })
    }
}