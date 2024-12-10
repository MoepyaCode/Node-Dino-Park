import { NextFunction, Request, Response } from "express"
import {  Zone } from "../entities"
import { DinoDigestI } from "./dino.model"

/**
 * Zone Service Interface
 */
export interface ZoneServiceI {
    /**
     * Initializes Zones into the Database
     * @returns void
     */
    init: () => Promise<void>

    /**
     * Gets all the Available Zones
     * @returns Promise of an Array of Zone objects
     */
    getAllZones: () => Promise<Zone[]>

    /**
     * 
     * @param location 
     * @returns Promise of single Zone object
     */
    getZoneByLocation: (location: string) => Promise<Zone>

    /**
     * Updates a Zone
     * @param location 
     * @param dino 
     * @returns Promise of a Zone object
     */
    updateZone: (location: string, dino: DinoDigestI[]) => Promise<Zone>

    /**
     * Updates the date of Maintenance within the Zone object
     * @param location 
     * @returns 
     */
    maintenanceUpdate: (location: string) => Promise<Zone>
}

/**
 * Zone Controller Interface
 */
export interface ZoneControllerI {
    /**
     * Handles API requests for Getting all Zone objects
     * @param request 
     * @param response 
     * @param next 
     * @returns 
     */
    getAllZones: (request: Request, response: Response, next: NextFunction) => Promise<Zone[]>

    /**
     * Handles API requests for Getting a single Zone object
     * @param request 
     * @param response 
     * @param next 
     * @returns 
     */
    getZoneByLocation: (request: Request, response: Response, next: NextFunction) => Promise<Zone>
}