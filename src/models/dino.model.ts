import { NextFunction, Request, Response } from "express"
import { Dino } from "../entities"

export interface DinoDigestI extends Dino {
    remaining_digest_time: number | null
}

/**
 * Dino Service consists of all Dino Service methods
 */
export interface DinoServiceI {
    /**
     * Gets all Dinos
     * @returns Array of Dino objects
     */
    getAllDinos: () => Promise<Dino[]>

    /**
     * Gets a single Dino
     * @param id 
     * @returns Array of Dino objects with value for remaining_digest_time
     */
    getDinoById: (id: number) => Promise<Dino>

    /**
     * Gets all Dinos in the Zone
     * @param location 
     * @returns Array of Dino objects with value for remaining_digest_time
     */
    getAllDinosInZone: (location: string) => Promise<DinoDigestI[]>

    /**
     * Add a new Dino to the Database
     * @param newDino 
     * @returns Dino object if added successfully
     */
    addDino: (newDino: Dino) => Promise<Dino>

    /**
     * Updates last_meal_time for Dino object
     * @param id 
     * @returns Dino object if fed successfully
     */
    feedDino: (id: number) => Promise<Dino>

    /**
     * Updates the location of the Dino
     * @param details 
     * @returns Dino object with the new location 
     */
    updateDinoLocation: (details: Pick<Dino, 'id' | 'location'>) => Promise<Dino>

    /**
     * Removes the dino from the Database
     * @param id 
     * @returns 
     */
    removeDinoById: (id: number) => Promise<Dino>
}

/**
 * Dino Controller consists of all Dino Controller methods
 */
export interface DinoControllerI {
    /**
     * Handles the API request for Getting all the Dinos
     * @param request 
     * @param response 
     * @param next 
     * @returns 
     */
    getAllDino: (request: Request, response: Response, next: NextFunction) => Promise<Dino[]>

    /**
     * Handles the API request for Getting a single Dino
     * @param request 
     * @param response 
     * @param next 
     * @returns 
     */
    getDinoById: (request: Request, response: Response, next: NextFunction) => Promise<Dino>
}