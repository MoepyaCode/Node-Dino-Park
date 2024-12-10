import { Request, Response, NextFunction } from "express";
import { ZoneControllerI } from "../models";
import { ZoneService } from "../services";
import { Zone } from "../entities";
import _ = require("lodash");

export class ZoneController implements ZoneControllerI {
    private zoneService: ZoneService

    constructor() {
        this.zoneService = new ZoneService()
    }

    getAllZones =  (request: Request, response: Response, next: NextFunction):Promise<Zone[]> => {
        return this.zoneService.getAllZones()
    }

    getZoneByLocation =  (request: Request, response: Response, next: NextFunction):Promise<Zone> => {
        const { location } = request.params
        return this.zoneService.getZoneByLocation(location)
    }
}