import { NextFunction, Request, Response } from "express"
import { Dino, Zone } from "../entities"

export type EventKinds = (
    'dino_added' |
    'dino_fed' |
    'dino_location_updated' |
    'dino_removed' |
    'maintenance_performed'
)

export type EventType = ({
    [D in keyof Dino]?: Dino[D]
} & {
    kind?: EventKinds
    time?: string
    dinosaur_id?: number
})

export type EventListType = EventType[]

export interface EventReturnI {
    dino: Dino
    newZone: Zone
    oldZone?: Zone
}

/**
 * Event Service contains method that affect Dino and Zone
 */
export interface EventServiceI {
    /**
     * Handles changes to Dino and Zone, on Adding a new Dino
     * @param eventFeed 
     * @returns An object of the affected Dino and Zone
     */
    addDinoHandler: (eventFeed: EventType) => Promise<EventReturnI>

    /**
     * Handles changes to Dino and Zone, on Feeding a Dino
     * Impact safety of a Zone if Dino is carnivore.
     * @param eventFeed 
     * @returns An object of the affected Dino and Zone
     */
    feedDinoHandler: (eventFeed: EventType) => Promise<EventReturnI>

    /**
     Handles changes to Dino and Zone, on Location change of Dino
     * @param eventFeed 
     * @returns An object of the affected Dino and Zone
     */
    updateDinoLocationHandler: (eventFeed: EventType) => Promise<EventReturnI>

    /**
     Handles changes to Dino and Zone, on removing a Dino
     * @param eventFeed 
     * @returns An object of the affected Dino and Zone
     */
    removeDinoHandler: (eventFeed: EventType) => Promise<EventReturnI>

    /**
     Handles changes to Zone being maintained
     * @param eventFeed 
     * @returns An object of the single Zone
     */
    maintenanceUpdateHandler: (eventFeed: EventType) => Promise<Zone>

    /**
     * Handles the syncing of the API (https://dinoparks.herokuapp.com/nudls/feed)
     * Syncs the API to data to the Database
     * @returns void
     */
    syncFeed: () => Promise<void>
}

/**
 * Event Controller contains method that handle API call that affect Dino and Zone
 */
export interface EventControllerI {
    /**
     * Handles the API request for the event of Adding a new Dino
     * @param request 
     * @param response 
     * @param next 
     * @returns Object of the affected Dino and Zone
     */
    addDino: (request: Request, response: Response, next: NextFunction) => Promise<EventReturnI>

    /**
     * Handles the API request for the event of Feeding Dino
     * @param request 
     * @param response 
     * @param next 
     * @returns Object of the affected Dino and Zone
     */
    feedDino: (request: Request, response: Response, next: NextFunction) => Promise<EventReturnI>

    /**
     * Handles the API request for the event of updating the Location of a Dino
     * @param request 
     * @param response 
     * @param next 
     * @returns Object of the affected Dino and Zone
     */
    updateDinoLocation: (request: Request, response: Response, next: NextFunction) => Promise<EventReturnI>

    /**
     * Handles the API request for the event of Removing a Dino
     * @param request 
     * @param response 
     * @param next 
     * @returns Object of the affected Dino and Zone
     */
    removeDinoById: (request: Request, response: Response, next: NextFunction) => Promise<EventReturnI>

    /**
     * Handles the API request for the event of maintenance performed on a Zone
     * @param request 
     * @param response 
     * @param next 
     * @returns Object of the affected Dino and Zone
     */
    maintenancePerformed: (request: Request, response: Response, next: NextFunction) => Promise<Zone>

    /**
     * Handles the API request for the event of Syncing the Nudl API data
     * @param request 
     * @param response 
     * @param next 
     * @returns Object of the affected Dino and Zone
     */
    syncFeed: (request: Request, response: Response, next: NextFunction) => Promise<void>
}