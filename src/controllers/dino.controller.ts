import { Request, Response, NextFunction } from "express";
import { Dino } from "../entities";
import { DinoControllerI, DinoServiceI } from "../models";
import { DinoService } from "../services";

export class DinoController implements DinoControllerI {
    private dinoService: DinoServiceI

    constructor() {
        this.dinoService = new DinoService()
    }

    getAllDino = async (request: Request, response: Response, next: NextFunction): Promise<Dino[]> => {
        return this.dinoService.getAllDinos()
    }

    getDinoById = async (request: Request, response: Response, next: NextFunction): Promise<Dino> => {
        const { id } = request.params
        return this.dinoService.getDinoById(parseInt(id))
    }
}