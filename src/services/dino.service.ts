import { AppDataSource } from "../data-source";
import { Dino } from "../entities";
import { DinoDigestI, DinoServiceI } from "../models";
import _ = require("lodash");

export class DinoService implements DinoServiceI {
    private dinoRepository = AppDataSource.getRepository(Dino)

    getAllDinos = async (): Promise<Dino[]> => {
        return this.dinoRepository.find()
    }

    getDinoById = async (id: number): Promise<Dino> => {
        const data = await this.dinoRepository.findOneBy({ id })
        if (!data) throw new Error('Dinosaur does not exist!')
        return data
    }

    getAllDinosInZone = async (location: string): Promise<DinoDigestI[]> => {
        const dinos = await this.dinoRepository.find({ where: { location } })
        return dinos.map(dino => ({ ...dino, remaining_digest_time: this.digestionTimeRemaining(dino) }))
    }

    addDino = async (newDino: Dino): Promise<Dino> => {
        const dino = Object.assign(new Dino(), newDino)

        if (dino.id) {
            const response = await this.dinoRepository.findOneBy({ id: dino.id })
            if (response) throw new Error('Dinosaur already exists')
        }

        for (const key of this.getDinoAttributes()) {
            const condition = key !== 'last_meal_time' && key !== "location" && _.isUndefined(dino[key])
            if (condition) {
                throw new Error(`Detail '${key}' is missing from Dino details!`)
            }
        }

        return this.dinoRepository.save(dino)
    }

    feedDino = async (id: number): Promise<Dino> => {
        const currentDateTime = new Date().toISOString()
        let dino = await this.getDinoById(id)

        dino.last_meal_time = currentDateTime
        return this.dinoRepository.save(dino)
    }

    updateDinoLocation = async (details: Pick<Dino, 'id' | 'location'>): Promise<Dino> => {
        const { id, location } = details
        let dino = await this.getDinoById(id)

        
        if (!location || typeof location !== 'string') {
            throw new Error('Invalid location entered!')
        }

        dino.location = location
        return this.dinoRepository.save(dino)
    }

    removeDinoById = async (id: number): Promise<Dino> => {
        const dino = await this.getDinoById(id)
        return this.dinoRepository.remove(dino)
    }

    private digestionTimeRemaining = (dino: Dino): number | null => {
        if (!dino.last_meal_time) return null

        const currentDateTime = new Date()
        const lastMealTime = new Date(dino.last_meal_time)
        const timeDiffInMilliSecs = currentDateTime.getTime() - lastMealTime.getTime()
        const remainingTime = dino.digestion_period_in_hours - (timeDiffInMilliSecs / (1000 * 60 * 60))
        return remainingTime > 2 ? remainingTime : null
    }

    private getDinoAttributes = (): Array<keyof Dino> => {
        return ["id", "name", "species", "gender", "digestion_period_in_hours",
            "herbivore", "park_id", "last_meal_time", "location"];
    }
}